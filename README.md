# General

This is the implementation repository for the public github page [gouverneurp.github.io](https://gouverneurp.github.io/) with repository under https://github.com/gouverneurp/gouverneurp.github.io.

# Copyright
Software and code are licensed under [MIT license](https://opensource.org/license/mit/).
External resources such as images are not licensed under MIT license.
All photographs in this repository and on [gouverneurp.github.io](https://gouverneurp.github.io/) have been made available to this project by Philip Gouverneur and are copyrighted; any other use must be authorized by the photographer 
which holds all the rights for those photos.
Detailed information can be found in the [LICENSE.md](LICENSE.md) and [copyrightstatement.html](copyrightstatement.html) files.

# Code used in this repository
Code used for this repository has been published under open source licenses, mostly MIT license.
The most important ones can be found in the following:

1. The landing page: https://github.com/RyanFitzgerald/devportfolio ([MIT license](https://opensource.org/license/mit/))
2. Gradient background: https://github.com/singhkshitij/My-Landing-Page ([MIT license](https://opensource.org/license/mit/))
3. Particles: https://github.com/lindelof/particles-bg-vue ([MIT license](https://opensource.org/license/mit/))
4. Bar chart: https://github.com/apache/echarts ([Apache License Version 2.0](https://www.apache.org/licenses/LICENSE-2.0))
5. Loading spinner: https://github.com/epicmaxco/epic-spinners ([MIT license](https://opensource.org/license/mit/))
6. Academicons: https://jpswalsh.github.io/academicons/ ([SIL OFL 1.1](http://scripts.sil.org/OFL))
7. FontAwesome: https://fontawesome.com/v4/license/ ([SIL OFL 1.1](http://scripts.sil.org/OFL))
8. Sliding images: https://codepen.io/Hyperplexed/pen/MWXBRBp ([MIT license](https://opensource.org/license/mit/)) inspired by [Camille Mormal](https://camillemormal.com/)
9. Notifications: https://github.com/simple-notify/simple-notify ([MIT license](https://opensource.org/license/mit/))

## Project structure
```
.
├── LICENSE.md
├── README.md
├── assets
│   ├── cv.pdf
│   ├── icons
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── browserconfig.xml
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   ├── mstile-150x150.png
│   │   ├── safari-pinned-tab.svg
│   │   └── site.webmanifest
│   └── publication_list_gouverneur.pdf
├── copyrightstatement.html
├── css
│   ├── bootstrap.min.css
│   └── styles.css
├── images
│   ├── cv_photo.jpg
│   ├── projects
│   │   ├── myAHA.jpg
│   │   ├── painmonit.png
│   │   └── screenfm.jpg
│   ├── publications
│   │   ├── comparison.png
│   │   └── xai.png
│   └── slideshow
│       ├── 1.jpg
│       ├── 10.jpg
│       ├── 11.jpg
│       ├── 12.jpg
│       ├── 13.jpg
│       ├── 2.jpg
│       ├── 3.jpg
│       ├── 4.jpg
│       ├── 5.jpg
│       ├── 6.jpg
│       ├── 7.jpg
│       ├── 8.jpg
│       └── 9.jpg
├── index.html
├── js
│   ├── js.js
│   └── scripts.min.js
├── libs
│   ├── echarts
│   │   ├── echarts.js
│   │   ├── echarts.js.map
│   │   └── echarts.simple.js.map
│   └── font-awesome
│       ├── css
│       │   ├── font-awesome.css
│       │   └── font-awesome.min.css
│       └── fonts
│           ├── FontAwesome.otf
│           ├── fontawesome-webfont.eot
│           ├── fontawesome-webfont.svg
│           ├── fontawesome-webfont.ttf
│           ├── fontawesome-webfont.woff
│           └── fontawesome-webfont.woff2
├── robots.txt
└── sitemap.xml
```

Tree structure was created using following command:
```bash
tree . -I '.vscode|.git|scripts'
```