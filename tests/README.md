## Testing

Testing the extension is much harder than I thought it would be. The main issue is that the extension needs to make cross-origin HTTP requests to obtain the DOMs of the websites it parses. Runners like Karma and Zuul execute the tests on localhost, so making these requests go through is a headache, or perhaps impossible.

The current solution is to package the tests as a separate extension in `dist/test`. Loading this extension automatically runs the tests in the background. The test output is printed to the browser console (in Chrome, this can be found under `chrome://extensions` --> Inspect views: background page).

Unfortunately, the output is ugly. Colours, formatting, icons, etc. to prettify the output are all missing. Ideally, the tests could be run via Karma or Zuul. The output would look better, but more importantly, it would be possible to set up continuous integration on Travis. Raise an issue if you have an idea about how to do this.