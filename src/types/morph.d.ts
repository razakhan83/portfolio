interface ViewTransition {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition(): void;
  types?: Set<string>;
}

interface Document {
  activeViewTransition?: ViewTransition | null;
}
