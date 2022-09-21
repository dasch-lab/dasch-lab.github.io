# DaScH-Lab website

this is the repository for the [DaScH-Lab][website] frontend. Static files are generated with [Eleventy], please check the documentation for any additional details.

### Requirements

Node is required in order to run the static files generation:
- Check if Node is installed: `node --version`
- If you see a version number, such as `v12.11.1`, proceed to [Get Started](#get-started)
- If Node isn't installed, [download][node-download] and install it, then proceed to [Get Started](#get-started)

### Project structure

```
. 
├── eleventy.js        # Eleventy configuration file
├── gulpfile.js        # Gulp configuration file
├── eleventy           # Eleventy additional filters
├── gulp               # Gulp tasks
└── src
    ├── _data          # Eleventy data folder
    ├── _includes
    │   └── layouts    # HTML layout files
    ├── assets         # Asset files
    │   ├── images     # Images used in pages
    │   ├── js         # Javascript used in pages
    │   └── scss       # Sass files that will be compiled into css
    └── docs           # Static pages
```

### Get Started

Fork or clone this repo, and install dev dependencies:
```bash
git clone git@github.com:dasch-lab/dashlab.github.io.git
cd mhc_front
npm install
```

### Building

To build the pages for production, or for development, please type from the project root directory `npm run <command>`. The repo has two main commands:
- **watch**: Generate front-end files and run a local web server that listen at `localhost:8080` and watch for changes, rebuilding the files when changes are detected. 
- **build**: Generate the front-end files in the `build` directory, ready to be deployed. 

> NOTE: please run `npm install` after every git pull to make sure dependencies are updated.

## Documentation

Any additional [project documentation][docs] file is in the `docs` directory.

[website]: https://www.toscanalifesciences.org/it/progetti/data-science-for-health-dasch-lab/
[node-download]: https://nodejs.org/en/download/
[pkg]: package.json
[docs]: _docs/
[dotenv-flow]: https://www.npmjs.com/package/dotenv-flow
[eleventy]: https://github.com/11ty/eleventy