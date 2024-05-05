# Raisely Tag Picker - Elise Wei


## Notes and thoughts

- When tags wrap to multiple lines, this can cause some weirdness, for sure, since they change dimensions depending on user interaction. I've dealt with it as well as I could.
- Some combo-box interactions may not be ideal on touch interfaces. In particular, arrow keys for navigating won't be as readily available.
- Accessibility tested for keyboard navigation, browser font size, zoom, reduced motion, and some light screen-reader testing (VoiceOver), as well as static analysis with the WAVE browser plugin and jsx-a11y linter.


## ToDos

- Needs test coverage
- Needs error handling
- CSS might benefit from pre-processing and modules
