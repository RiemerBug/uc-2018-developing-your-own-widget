# `i18n` View Steps

To make your widget support multiple locales, we can bring Dojo's `i18n` module to help.

1. We've gone ahead and set up the directory structure and files to support this module. To summarize, we have our root messages bundle with all the messages we want localized, along with the locales our widget supports

  **app/nls/WebMapShowcase.js**

  ```ts
  // default (English) messages
  export const root = {
    play: "Play",
    pause: "Pause",
    lastUpdated: "Last updated ${date}"
  };
  
  // enable i18n for Spanish
  export const es = true;
  ```

  We've also defined the Spanish bundle, which is enabled in the root bundle.

  **app/nls/es/WebMapShowcase.js**

  ```ts
  const messages = {
    // Spanish messages-only
    play: "Reproducir",
    pause: "Pausar",
    lastUpdated: "Última actualizacíon ${date}"
  };
  
  export = messages;
  ```

1. With the NLS bundles in place, we can now import them using the `i18n` module

  ```tsx
  import i18n = require("dojo/i18n!./nls/WebMapShowcase");
  ```

  **Note**: You should reference the main bundle for your widget, the `i18n` system will take care of loading the appropriate one based on the user's locale.

1. We can now use the values from the root bundle we defined to get the localized values


  ```tsx
  const buttonText = _playing ? i18n.pause : i18n.play;
  ```

  ```tsx
  <div class={CSS.modifiedDate}>
    {i18n.lastUpdated.replace(/\${date}/, active.modified.toLocaleString())}
  </div>
  ```

  Our widget is now using `i18n` and will now load the proper strings based on the user locale.
