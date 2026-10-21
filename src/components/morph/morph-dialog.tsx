"use client";

import {
  addTransitionType,
  createContext,
  startTransition,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  ViewTransition,
  type ComponentProps,
  type ReactNode,
  type RefObject,
} from "react";

const X = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M4 4l8 8" />
    <path d="M12 4l-8 8" />
  </svg>
);

const share = {
  "dialog-close": "vt-move vt-expand vt-quick",
  default: "vt-move vt-expand",
};

function animate(update: () => void) {
  if (typeof document !== "undefined" && "activeViewTransition" in document) {
    (document as unknown as { activeViewTransition?: { skipTransition: () => void } }).activeViewTransition?.skipTransition();
  }
  startTransition(update);
}

type DialogState = {
  id: string;
  name: string;
  open: boolean;
  show: () => void;
  close: () => void;
  closeNow: () => void;
  trigger: RefObject<HTMLElement | null>;
};

const Context = createContext<DialogState | null>(null);

function linkParts(el: HTMLElement, id: string) {
  for (const [attr, part] of [
    ["aria-labelledby", "title"],
    ["aria-describedby", "description"],
  ]) {
    if (document.getElementById(`${id}-${part}`)) {
      el.setAttribute(attr, `${id}-${part}`);
    } else {
      el.removeAttribute(attr);
    }
  }
}

export function useDialog() {
  const dialog = useContext(Context);
  if (!dialog) {
    throw new Error("MorphDialog parts must be used inside <MorphDialog>");
  }
  return dialog;
}

export interface MorphDialogProps {
  children: ReactNode;
  transitionName?: string;
}

export function MorphDialog({ children, transitionName }: MorphDialogProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLElement>(null);
  const name = transitionName || `dialog-${id.replace(/:/g, "")}`;

  const state: DialogState = {
    id,
    name,
    open,
    trigger,
    show: () => animate(() => setOpen(true)),
    close: () =>
      animate(() => {
        try {
          addTransitionType("dialog-close");
        } catch {
          // ignore if unsupported
        }
        setOpen(false);
      }),
    closeNow: () => {
      if (typeof document !== "undefined" && "activeViewTransition" in document) {
        (document as unknown as { activeViewTransition?: { skipTransition: () => void } }).activeViewTransition?.skipTransition();
      }
      setOpen(false);
    },
  };

  return (
    <Context.Provider value={state}>
      <div>{children}</div>
    </Context.Provider>
  );
}

export function MorphDialogTrigger({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { name, open, show, trigger } = useDialog();

  if (open) {
    return (
      <div aria-hidden className={`invisible ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <ViewTransition key="trigger" name={name} share={share}>
      <div
        ref={trigger as RefObject<HTMLDivElement | null>}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        onClick={show}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            show();
          }
        }}
        className={`block w-full cursor-pointer text-left outline-none ${className}`}
      >
        {children}
      </div>
    </ViewTransition>
  );
}

export function MorphDialogContent({
  className = "",
  children,
  "aria-label": label,
}: {
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  const { id, name, open, close, trigger } = useDialog();
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) {
      linkParts(el, id);
      el.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!open && el.open) {
      el.close();
      document.body.style.overflow = "";
      trigger.current?.focus({ preventScroll: true });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, id, trigger]);

  return (
    <dialog
      ref={dialog}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onPointerDown={(e) => {
        const r = panel.current?.getBoundingClientRect();
        if (!r) return;
        const inside =
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom;
        if (!inside) close();
      }}
      className="fixed inset-0 m-0 size-full max-h-none max-w-none overflow-y-auto overscroll-contain bg-black/45 backdrop-blur-xs p-0 text-deep opacity-0 transition-[opacity,display,overlay] transition-discrete duration-200 ease-out backdrop:bg-transparent open:opacity-100 motion-reduce:duration-100 starting:open:opacity-0 z-50"
    >
      <div className="grid min-h-full place-items-center p-4 sm:p-6 md:p-8">
        {open && (
          <ViewTransition key="panel" name={name} share={share}>
            <div
              ref={panel}
              className={`relative w-full max-w-2xl bg-surface border border-border rounded-xl shadow-lg p-6 sm:p-8 text-deep max-h-[90vh] overflow-y-auto ${className}`}
            >
              {children}
              <button
                type="button"
                aria-label="Close dialog"
                onClick={close}
                className="absolute top-4 right-4 inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted hover:text-deep hover:bg-border/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary z-10"
              >
                <X className="size-4" />
              </button>
            </div>
          </ViewTransition>
        )}
      </div>
    </dialog>
  );
}

export function MorphDialogTitle({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { id } = useDialog();
  return (
    <h2
      id={`${id}-title`}
      className={`font-heading font-bold text-2xl sm:text-3xl text-deep uppercase tracking-tight pr-8 ${className}`}
    >
      {children}
    </h2>
  );
}

export function MorphDialogDescription({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { id } = useDialog();
  return (
    <div id={`${id}-description`} className={`mt-2 ${className}`}>
      {children}
    </div>
  );
}

export function MorphDialogClose({
  onClick,
  type = "button",
  ...props
}: ComponentProps<"button">) {
  const { close } = useDialog();
  return (
    <button
      type={type}
      onClick={(e) => {
        onClick?.(e);
        close();
      }}
      {...props}
    />
  );
}
