(function (global) {
  'use strict';

  var VERSION = '2.15.0';

  // ── Embedded product images ──────────────────────────────────────────────
  var IMAGES = {
    '2': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028428251/UBvV5wJZ8ZDuFe37KDNuE3/2-bottles_5d238470.png',
    '3': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028428251/UBvV5wJZ8ZDuFe37KDNuE3/3-bottles_14c1f99e.png',
    '6': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028428251/UBvV5wJZ8ZDuFe37KDNuE3/6-bottles-blow1_4050a12d.png'
  };

  // ── Payment icons: real brand SVGs, wrapped in a card-sized container ────
  function makeCardIcon(svgContent, label) {
    return '<span style="display:inline-flex;align-items:center;justify-content:center;'
      + 'width:46px;height:30px;border-radius:5px;overflow:hidden;border:1px solid rgba(0,0,0,0.10);'
      + 'background:#fff;flex-shrink:0;" title="' + label + '">'
      + '<svg viewBox="0 0 780 500" xmlns="http://www.w3.org/2000/svg" '
      + 'width="46" height="30" style="display:block;">'
      + svgContent
      + '</svg>'
      + '</span>';
  }

  // Inner SVG content only (no outer <svg> wrapper — we wrap ourselves)
  var CARD_INNER = {
    visa:       "<g clip-path=\"url(#clip0_6278_125833)\"> <path d=\"M780 0H0V500H780V0Z\" fill=\"#1434CB\"/> <path d=\"M489.823 143.111C442.988 143.111 401.134 167.393 401.134 212.256C401.134 263.706 475.364 267.259 475.364 293.106C475.364 303.989 462.895 313.731 441.6 313.731C411.377 313.731 388.789 300.119 388.789 300.119L379.123 345.391C379.123 345.391 405.145 356.889 439.692 356.889C490.898 356.889 531.19 331.415 531.19 285.784C531.19 231.419 456.652 227.971 456.652 203.981C456.652 195.455 466.887 186.114 488.122 186.114C512.081 186.114 531.628 196.014 531.628 196.014L541.087 152.289C541.087 152.289 519.818 143.111 489.823 143.111ZM61.3294 146.411L60.1953 153.011C60.1953 153.011 79.8988 156.618 97.645 163.814C120.495 172.064 122.122 176.868 125.971 191.786L167.905 353.486H224.118L310.719 146.411H254.635L198.989 287.202L176.282 167.861C174.199 154.203 163.651 146.411 150.74 146.411H61.3294ZM333.271 146.411L289.275 353.486H342.756L386.598 146.411H333.271ZM631.554 146.411C618.658 146.411 611.825 153.318 606.811 165.386L528.458 353.486H584.542L595.393 322.136H663.72L670.318 353.486H719.805L676.633 146.411H631.554ZM638.848 202.356L655.473 280.061H610.935L638.848 202.356Z\" fill=\"white\"/> </g> <defs> <clipPath id=\"clip0_6278_125833\"> <rect width=\"780\" height=\"500\" fill=\"white\"/> </clipPath> </defs>",
    mc:         "<g clip-path=\"url(#clip0_6278_125825)\"> <path d=\"M780 0H0V500H780V0Z\" fill=\"#253747\"/> <path d=\"M211.053 467.045V438.109C211.053 427.041 204.311 419.793 192.736 419.793C186.949 419.793 180.657 421.703 176.33 427.996C172.959 422.715 168.127 419.793 160.879 419.793C156.047 419.793 151.215 421.254 147.395 426.535V420.748H137.281V467.045H147.395V441.481C147.395 433.278 151.721 429.401 158.463 429.401C165.205 429.401 168.577 433.727 168.577 441.481V467.045H178.69V441.481C178.69 433.278 183.522 429.401 189.759 429.401C196.501 429.401 199.872 433.727 199.872 441.481V467.045H211.053ZM361.068 420.748H344.662V406.758H334.549V420.748H325.391V429.906H334.549V451.145C334.549 461.764 338.875 468 350.449 468C354.776 468 359.608 466.539 362.979 464.629L360.057 455.92C357.135 457.831 353.764 458.336 351.348 458.336C346.516 458.336 344.606 455.415 344.606 450.639V429.906H361.012V420.748H361.068ZM446.92 419.737C441.133 419.737 437.256 422.658 434.84 426.479V420.692H424.727V466.989H434.84V440.919C434.84 433.221 438.211 428.839 444.504 428.839C446.414 428.839 448.83 429.345 450.797 429.794L453.718 420.13C451.696 419.737 448.83 419.737 446.92 419.737ZM317.187 424.569C312.356 421.198 305.613 419.737 298.365 419.737C286.791 419.737 279.094 425.524 279.094 434.682C279.094 442.38 284.881 446.762 294.994 448.167L299.826 448.672C305.108 449.628 308.029 451.088 308.029 453.504C308.029 456.875 304.152 459.291 297.41 459.291C290.668 459.291 285.33 456.875 281.959 454.459L277.127 462.157C282.409 466.034 289.657 467.944 296.904 467.944C310.389 467.944 318.143 461.651 318.143 452.999C318.143 444.796 311.85 440.469 302.242 439.008L297.41 438.503C293.084 437.997 289.713 437.042 289.713 434.176C289.713 430.805 293.084 428.895 298.421 428.895C304.209 428.895 309.996 431.311 312.917 432.772L317.187 424.569ZM586.26 419.737C580.473 419.737 576.596 422.658 574.18 426.479V420.692H564.067V466.989H574.18V440.919C574.18 433.221 577.551 428.839 583.844 428.839C585.754 428.839 588.17 429.345 590.137 429.794L593.059 420.242C591.092 419.737 588.227 419.737 586.26 419.737ZM457.033 443.897C457.033 457.887 466.697 468 481.643 468C488.385 468 493.217 466.539 498.049 462.719L493.217 454.516C489.34 457.437 485.519 458.842 481.137 458.842C472.934 458.842 467.147 453.055 467.147 443.897C467.147 435.188 472.934 429.401 481.137 428.951C485.463 428.951 489.34 430.412 493.217 433.278L498.049 425.074C493.217 421.198 488.385 419.793 481.643 419.793C466.697 419.737 457.033 429.906 457.033 443.897ZM550.582 443.897V420.748H540.469V426.535C537.098 422.209 532.266 419.793 525.973 419.793C512.938 419.793 502.825 429.906 502.825 443.897C502.825 457.887 512.938 468 525.973 468C532.715 468 537.547 465.584 540.469 461.258V467.045H550.582V443.897ZM513.444 443.897C513.444 435.693 518.725 428.951 527.434 428.951C535.637 428.951 541.424 435.244 541.424 443.897C541.424 452.1 535.637 458.842 527.434 458.842C518.781 458.336 513.444 452.043 513.444 443.897ZM392.42 419.737C378.935 419.737 369.271 429.401 369.271 443.84C369.271 458.336 378.935 467.944 392.926 467.944C399.668 467.944 406.41 466.034 411.748 461.651L406.916 454.403C403.039 457.325 398.207 459.235 393.431 459.235C387.139 459.235 380.902 456.314 379.441 448.167H413.658C413.658 446.706 413.658 445.751 413.658 444.29C414.108 429.401 405.399 419.737 392.42 419.737ZM392.42 428.446C398.713 428.446 403.039 432.322 403.994 439.514H379.891C380.846 433.278 385.172 428.446 392.42 428.446ZM643.682 443.897V402.432H633.568V426.535C630.197 422.209 625.365 419.793 619.073 419.793C606.037 419.793 595.924 429.906 595.924 443.897C595.924 457.887 606.037 468 619.073 468C625.815 468 630.647 465.584 633.568 461.258V467.045H643.682V443.897ZM606.543 443.897C606.543 435.693 611.825 428.951 620.533 428.951C628.736 428.951 634.524 435.244 634.524 443.897C634.524 452.1 628.736 458.842 620.533 458.842C611.825 458.336 606.543 452.043 606.543 443.897ZM267.969 443.897V420.748H257.855V426.535C254.484 422.209 249.652 419.793 243.36 419.793C230.325 419.793 220.211 429.906 220.211 443.897C220.211 457.887 230.325 468 243.36 468C250.102 468 254.934 465.584 257.855 461.258V467.045H267.969V443.897ZM230.381 443.897C230.381 435.693 235.662 428.951 244.371 428.951C252.574 428.951 258.361 435.244 258.361 443.897C258.361 452.1 252.574 458.842 244.371 458.842C235.662 458.336 230.381 452.043 230.381 443.897Z\" fill=\"white\"/> <path d=\"M465.738 69.1387H313.812V342.088H465.738V69.1387Z\" fill=\"#FF5A00\"/> <path d=\"M323.926 205.613C323.926 150.158 349.996 100.94 390 69.1387C360.559 45.9902 323.42 32 282.91 32C186.945 32 109.297 109.648 109.297 205.613C109.297 301.578 186.945 379.227 282.91 379.227C323.42 379.227 360.559 365.237 390 342.088C349.94 310.737 323.926 261.069 323.926 205.613Z\" fill=\"#EB001B\"/> <path d=\"M670.711 205.613C670.711 301.578 593.062 379.227 497.098 379.227C456.588 379.227 419.449 365.237 390.008 342.088C430.518 310.231 456.082 261.069 456.082 205.613C456.082 150.158 430.012 100.94 390.008 69.1387C419.393 45.9902 456.532 32 497.041 32C593.062 32 670.711 110.154 670.711 205.613Z\" fill=\"#F79E1B\"/> </g> <defs> <clipPath id=\"clip0_6278_125825\"> <rect width=\"780\" height=\"500\" fill=\"white\"/> </clipPath> </defs>",
    discover:   "<g fill-rule=\"evenodd\"><path d=\"M54.992 0C0 0 0 0 0 0v0C0 0 0 0 0 501h670.016C755.373 501 780 476.37 780 445.996V0C0 0 755.381 0 725.008 0H54.992z\" fill=\"#4D4D4D\"/><path d=\"M327.152 161.893c8.837 0 16.248 1.784 25.268 6.09v22.751c-8.544-7.863-15.955-11.154-25.756-11.154-19.264 0-34.414 15.015-34.414 34.05 0 20.075 14.681 34.196 35.37 34.196 9.312 0 16.586-3.12 24.8-10.857v22.763c-9.341 4.14-16.911 5.776-25.756 5.776-31.278 0-55.582-22.596-55.582-51.737 0-28.826 24.951-51.878 56.07-51.878zm-97.113.627c11.546 0 22.11 3.72 30.943 10.994l-10.748 13.248c-5.35-5.646-10.41-8.028-16.564-8.028-8.853 0-15.3 4.745-15.3 10.989 0 5.354 3.619 8.188 15.944 12.482 23.365 8.044 30.29 15.176 30.29 30.926 0 19.193-14.976 32.553-36.32 32.553-15.63 0-26.994-5.795-36.458-18.872l13.268-12.03c4.73 8.61 12.622 13.222 22.42 13.222 9.163 0 15.947-5.952 15.947-13.984 0-4.164-2.055-7.734-6.158-10.258-2.066-1.195-6.158-2.977-14.2-5.647-19.291-6.538-25.91-13.527-25.91-27.185 0-16.225 14.214-28.41 32.846-28.41zm234.723 1.728h22.437l28.084 66.592 28.446-66.592h22.267l-45.494 101.686h-11.053l-44.687-101.686zm-397.348.152h30.15c33.312 0 56.534 20.382 56.534 49.641 0 14.59-7.104 28.696-19.118 38.057-10.108 7.901-21.626 11.445-37.574 11.445H67.414V164.4zm96.135 0h20.54v99.143h-20.54V164.4zm411.734 0h58.252v16.8H595.81v22.005h36.336v16.791h-36.336v26.762h37.726v16.785h-58.252V164.4zm71.858 0h30.455c23.69 0 37.265 10.71 37.265 29.272 0 15.18-8.514 25.14-23.986 28.105l33.148 41.766h-25.26l-28.429-39.828h-2.678v39.828h-20.515V164.4zm20.515 15.616v30.025h6.002c13.117 0 20.069-5.362 20.069-15.328 0-9.648-6.954-14.697-19.745-14.697h-6.326zM87.94 181.199v65.559h5.512c13.273 0 21.656-2.394 28.11-7.88 7.103-5.955 11.376-15.465 11.376-24.98 0-9.499-4.273-18.725-11.376-24.681-6.785-5.78-14.837-8.018-28.11-8.018H87.94z\" fill=\"#FFF\"/><path d=\"M415.13 161.213c30.941 0 56.022 23.58 56.022 52.709v.033c0 29.13-25.081 52.742-56.021 52.742s-56.022-23.613-56.022-52.742v-.033c0-29.13 25.082-52.71 56.022-52.71zM779.983 288.36c-26.05 18.33-221.077 149.34-558.754 212.623H724.99c30.365 0 54.992-0 54.992-0V0z\" fill=\"#F47216\"/></g>",
    amex:       "<rect width=\"780\" height=\"500\" fill=\"#2557D6\"/><path d=\"m0.253 235.69h37.441l8.442-19.51h18.9l8.42 19.51h73.668v-14.915l6.576 14.98h38.243l6.576-15.202v15.138h183.08l-0.085-32.026h3.542c2.479 0.083 3.204 0.302 3.204 4.226v27.8h94.689v-7.455c7.639 3.92 19.518 7.455 35.148 7.455h39.836l8.525-19.51h18.9l8.337 19.51h76.765v-18.532l11.626 18.532h61.515v-122.51h-60.88v14.468l-8.522-14.468h-62.471v14.468l-7.828-14.468h-84.38c-14.123 0-26.539 1.889-36.569 7.153v-7.153h-58.229v7.153c-6.383-5.426-15.079-7.153-24.75-7.153h-212.74l-14.274 31.641-14.659-31.641h-67.005v14.468l-7.362-14.468h-57.145l-26.539 58.246v64.261h3e-3zm236.34-17.67h-22.464l-0.083-68.794-31.775 68.793h-19.24l-31.858-68.854v68.854h-44.57l-8.42-19.592h-45.627l-8.505 19.592h-23.801l39.241-87.837h32.559l37.269 83.164v-83.164h35.766l28.678 59.587 26.344-59.587h36.485l1e-3 87.838zm-165.9-37.823l-14.998-35.017-14.915 35.017h29.913zm255.3 37.821h-73.203v-87.837h73.203v18.291h-51.289v15.833h50.06v18.005h-50.061v17.542h51.289l1e-3 18.166zm103.16-64.18c0 14.004-9.755 21.24-15.439 23.412 4.794 1.748 8.891 4.838 10.84 7.397 3.094 4.369 3.628 8.271 3.628 16.116v17.255h-22.104l-0.083-11.077c0-5.285 0.528-12.886-3.458-17.112-3.202-3.09-8.083-3.76-15.973-3.76h-23.523v31.95h-21.914v-87.838h50.401c11.199 0 19.451 0.283 26.535 4.207 6.933 3.924 11.09 9.652 11.09 19.45zm-27.699 13.042c-3.013 1.752-6.573 1.81-10.841 1.81h-26.62v-19.51h26.982c3.818 0 7.804 0.164 10.393 1.584 2.842 1.28 4.601 4.003 4.601 7.765 0 3.84-1.674 6.929-4.515 8.351zm62.844 51.138h-22.358v-87.837h22.358v87.837zm259.56 0h-31.053l-41.535-65.927v65.927h-44.628l-8.527-19.592h-45.521l-8.271 19.592h-25.648c-10.649 0-24.138-2.257-31.773-9.715-7.701-7.458-11.708-17.56-11.708-33.533 0-13.027 2.395-24.936 11.812-34.347 7.085-7.01 18.18-10.242 33.28-10.242h21.215v18.821h-20.771c-7.997 0-12.514 1.14-16.862 5.203-3.735 3.699-6.298 10.69-6.298 19.897 0 9.41 1.951 16.196 6.023 20.628 3.373 3.476 9.506 4.53 15.272 4.53h9.842l30.884-69.076h32.835l37.102 83.081v-83.08h33.366l38.519 61.174v-61.174h22.445v87.833zm-133.2-37.82l-15.165-35.017-15.081 35.017h30.246zm189.04 178.08c-5.322 7.457-15.694 11.238-29.736 11.238h-42.319v-18.84h42.147c4.181 0 7.106-0.527 8.868-2.175 1.665-1.474 2.605-3.554 2.591-5.729 0-2.561-1.064-4.593-2.677-5.811-1.59-1.342-3.904-1.95-7.722-1.95-20.574-0.67-46.244 0.608-46.244-27.194 0-12.742 8.443-26.156 31.439-26.156h43.649v-17.479h-40.557c-12.237 0-21.129 2.81-27.425 7.174v-7.175h-59.985c-9.595 0-20.854 2.279-26.179 7.175v-7.175h-107.12v7.175c-8.524-5.892-22.908-7.175-29.549-7.175h-70.656v7.175c-6.745-6.258-21.742-7.175-30.886-7.175h-79.077l-18.094 18.764-16.949-18.764h-118.13v122.59h115.9l18.646-19.062 17.565 19.062 71.442 0.061v-28.838h7.021c9.479 0.14 20.66-0.228 30.523-4.312v33.085h58.928v-31.952h2.842c3.628 0 3.985 0.144 3.985 3.615v28.333h179.01c11.364 0 23.244-2.786 29.824-7.845v7.845h56.78c11.815 0 23.354-1.587 32.134-5.649l2e-3 -22.84zm-354.94-47.155c0 24.406-19.005 29.445-38.159 29.445h-27.343v29.469h-42.591l-26.984-29.086-28.042 29.086h-86.802v-87.859h88.135l26.961 28.799 27.875-28.799h70.021c17.389 0 36.929 4.613 36.929 28.945zm-174.22 40.434h-53.878v-17.48h48.11v-17.926h-48.11v-15.974h54.939l23.969 25.604-25.03 25.776zm86.81 10.06l-33.644-35.789 33.644-34.65v70.439zm49.757-39.066h-28.318v-22.374h28.572c7.912 0 13.404 3.09 13.404 10.772 0 7.599-5.238 11.602-13.658 11.602zm148.36-40.373h73.138v18.17h-51.315v15.973h50.062v17.926h-50.062v17.48l51.314 0.08v18.23h-73.139l2e-3 -87.859zm-28.119 47.029c4.878 1.725 8.865 4.816 10.734 7.375 3.095 4.291 3.542 8.294 3.631 16.037v17.418h-22.002v-10.992c0-5.286 0.531-13.112-3.542-17.198-3.201-3.147-8.083-3.899-16.076-3.899h-23.42v32.09h-22.02v-87.859h50.594c11.093 0 19.173 0.47 26.366 4.146 6.915 4.004 11.266 9.487 11.266 19.511-1e-3 14.022-9.764 21.178-15.531 23.371zm-12.385-11.107c-2.932 1.667-6.556 1.811-10.818 1.811h-26.622v-19.732h26.982c3.902 0 7.807 0.08 10.458 1.587 2.84 1.423 4.538 4.146 4.538 7.903 0 3.758-1.699 6.786-4.538 8.431zm197.82 5.597c4.27 4.229 6.554 9.571 6.554 18.613 0 18.9-12.322 27.723-34.425 27.723h-42.68v-18.84h42.51c4.157 0 7.104-0.525 8.95-2.175 1.508-1.358 2.589-3.333 2.589-5.729 0-2.561-1.17-4.592-2.675-5.811-1.675-1.34-3.986-1.949-7.803-1.949-20.493-0.67-46.157 0.609-46.157-27.192 0-12.744 8.355-26.158 31.33-26.158h43.932v18.7h-40.198c-3.984 0-6.575 0.145-8.779 1.587-2.4 1.422-3.29 3.534-3.29 6.319 0 3.314 2.037 5.57 4.795 6.546 2.311 0.77 4.795 0.995 8.526 0.995l11.797 0.306c11.895 0.276 20.061 2.248 25.024 7.065zm86.955-23.52h-39.938c-3.986 0-6.638 0.144-8.867 1.587-2.312 1.423-3.202 3.534-3.202 6.322 0 3.314 1.951 5.568 4.791 6.544 2.312 0.771 4.795 0.996 8.444 0.996l11.878 0.304c11.983 0.284 19.982 2.258 24.86 7.072 0.891 0.67 1.422 1.422 2.033 2.175v-25h1e-3z\" fill=\"#fff\"/>"
  };

  function paymentIconsHTML() {
    return makeCardIcon(CARD_INNER.visa,     'Visa')
         + makeCardIcon(CARD_INNER.mc,       'Mastercard')
         + makeCardIcon(CARD_INNER.discover, 'Discover')
         + makeCardIcon(CARD_INNER.amex,     'American Express');
  }

  // ── Guarantee badge (SVG) ────────────────────────────────────────────────
  // Badge: all text lines vertically centered inside the inner circle
  // Inner circle center=45, r=36 → usable band ≈ y 20–70
  // Lines: MONEY BACK (y=36), 100% (y=50), GUARANTEED (y=63)
  var BADGE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" width="72" height="72">'
    + '<circle cx="45" cy="45" r="43" fill="#C8960C" stroke="#F7D060" stroke-width="2"/>'
    + '<circle cx="45" cy="45" r="36" fill="#8B6914"/>'
    + '<text x="45" y="34" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="8.5" font-weight="bold" fill="#FFE566">MONEY BACK</text>'
    + '<text x="45" y="48" text-anchor="middle" dominant-baseline="middle" font-family="Arial Black,Arial" font-size="17" font-weight="900" fill="#FFE566">100%</text>'
    + '<text x="45" y="61" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="8.5" font-weight="bold" fill="#FFE566">GUARANTEED</text>'
    + '</svg>';

  // ── CSS ──────────────────────────────────────────────────────────────────
  var CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

    /* ── Wrapper ─────────────────────────────────────────────────────── */
    .vc-b-bump-wrapper {
      font-family: 'Inter', sans-serif;
      width: 100%;
      box-sizing: border-box;
      padding: 40px 16px 32px;
      background: transparent;
    }
    .vc-b-bump-title {
      text-align: center;
      font-size: clamp(18px, 3vw, 26px);
      font-weight: 800;
      color: #1a1a2e;
      margin-bottom: 8px;
      letter-spacing: -0.3px;
    }
    .vc-b-bump-subtitle {
      text-align: center;
      font-size: clamp(13px, 2vw, 15px);
      color: #555;
      margin-bottom: 40px;
    }

    /* ── Grid ────────────────────────────────────────────────────────── */
    .vc-b-bump-grid {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 32px;
      width: 100%;
      margin: 0 auto;
      padding: 0;
      box-sizing: border-box;
    }
    @media (min-width: 900px) {
      .vc-b-bump-grid {
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 20px;
        max-width: 1200px;
        align-items: center;
        padding: 20px 32px;
      }
      .vc-b-bump-grid .vc-b-card-wrap { order: var(--vc-order-desktop, 0); }
    }
    @media (max-width: 899px) {
      .vc-b-bump-grid .vc-b-card-wrap { order: var(--vc-order-mobile, 0); }
    }

    /* ── Best Offer Label (above center card) ────────────────────────── */
    .vc-b-best-offer-label {
      text-align: center;
      font-size: 14px;
      font-weight: 800;
      color: #c87b1a;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
      text-transform: uppercase;
    }
    .vc-b-card-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: visible;
    }
    @media (min-width: 900px) {
      .vc-b-card-wrap { flex: 0 0 auto; overflow: visible; padding: 8px 6px; }
    }

    /* ── Card base ───────────────────────────────────────────────────── */
    .vc-b-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: inherit;
      box-sizing: border-box;
      width: 100%;
      max-width: 360px;
      padding: 0 0 20px 0;
      border-radius: 16px;
      border: 2px solid #c87b1a;
      background: #ffffff;
      overflow: hidden;
      cursor: pointer;
      will-change: transform;
      transition: transform 0.30s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.30s ease;
      box-shadow: 0 4px 20px rgba(0,0,0,0.10);
      position: relative;
      z-index: 1;
    }
    .vc-b-card:hover {
      transform: scale(1.08);
      box-shadow: 0 20px 60px rgba(0,0,0,0.30);
      z-index: 10;
    }

    /* ── Center card (Best Value) ────────────────────────────────────── */
    .vc-b-card.vc-b-best {
      background: #073133;
      border-color: #c87b1a;
      box-shadow: 0 8px 40px rgba(200,123,26,0.30), 0 4px 16px rgba(0,0,0,0.20);
    }
    .vc-b-card.vc-b-best:hover {
      transform: scale(1.08);
      box-shadow: 0 24px 72px rgba(200,123,26,0.60), 0 8px 32px rgba(0,0,0,0.32);
    }
    @media (min-width: 900px) {
      .vc-b-card { width: 340px; max-width: 340px; }
      .vc-b-card.vc-b-best { width: 400px; max-width: 400px; }
    }

    /* ── Card header bar ─────────────────────────────────────────────── */
    .vc-b-card-header {
      width: 100%;
      background: #c87b1a;
      padding: 12px 16px 10px;
      text-align: center;
      box-sizing: border-box;
    }
    .vc-b-card-headline {
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.2px;
    }
    .vc-b-card-desc {
      font-size: 13px;
      font-weight: 500;
      color: rgba(255,255,255,0.88);
      margin-top: 2px;
    }

    /* ── Bottle count headline ───────────────────────────────────────── */
    .vc-b-bottles-headline {
      margin-top: 18px;
      text-align: center;
      line-height: 1.1;
    }
    .vc-b-bottles-count {
      font-size: 34px;
      font-weight: 900;
      color: #111;
      display: block;
      letter-spacing: -1px;
    }
    .vc-b-card.vc-b-best .vc-b-bottles-count { color: #ffffff; }
    .vc-b-bottles-label {
      font-size: 13px;
      font-weight: 600;
      color: #555;
      display: block;
      margin-top: 2px;
    }
    .vc-b-card.vc-b-best .vc-b-bottles-label { color: rgba(255,255,255,0.75); }

    /* ── Image ───────────────────────────────────────────────────────── */
    .vc-b-img-wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding: 14px 12px 10px;
      box-sizing: border-box;
      min-height: 150px;
      position: relative;
    }
    .vc-b-img-wrap img {
      max-width: 100%;
      max-height: 170px;
      object-fit: contain;
      display: block;
    }
    .vc-b-card.vc-b-best .vc-b-img-wrap {
      min-height: 190px;
      padding: 10px 8px 8px;
    }
    .vc-b-card.vc-b-best .vc-b-img-wrap img { max-height: 210px; max-width: 95%; }

    /* ── Price block ─────────────────────────────────────────────────── */
    .vc-b-price-block {
      display: flex;
      justify-content: center;
      align-items: baseline;
      margin: 10px 0 4px;
      gap: 2px;
    }
    .vc-b-price-dollar {
      font-size: 22px;
      font-weight: 900;
      color: #111;
      line-height: 1;
      align-self: flex-start;
      margin-top: 6px;
    }
    .vc-b-card.vc-b-best .vc-b-price-dollar { color: #ffffff; }
    .vc-b-price-amount {
      font-size: 64px;
      font-weight: 900;
      color: #111;
      line-height: 1;
      letter-spacing: -3px;
    }
    .vc-b-card.vc-b-best .vc-b-price-amount { color: #ffffff; }
    .vc-b-price-unit {
      font-size: 11px;
      font-weight: 700;
      color: #666;
      line-height: 1.3;
      text-transform: uppercase;
      align-self: flex-end;
      margin-bottom: 6px;
      margin-left: 4px;
    }
    .vc-b-card.vc-b-best .vc-b-price-unit { color: rgba(255,255,255,0.7); }

    /* ── Checklist rows ──────────────────────────────────────────────── */
    .vc-b-checklist {
      width: 100%;
      padding: 0 18px;
      box-sizing: border-box;
      margin: 6px 0 10px;
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .vc-b-check-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 0;
      border-bottom: 1px dashed rgba(0,0,0,0.12);
      font-size: 12px;
      font-weight: 700;
      color: #333;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .vc-b-card.vc-b-best .vc-b-check-row {
      border-bottom-color: rgba(255,255,255,0.12);
      color: #e0e0e0;
    }
    .vc-b-check-row:last-child { border-bottom: none; }
    .vc-b-check-icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      border-radius: 50%;
      border: 2px solid #c87b1a;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .vc-b-check-icon svg { width: 10px; height: 10px; }
    .vc-b-save-text { color: #c87b1a; }
    .vc-b-card.vc-b-best .vc-b-save-text { color: #f0c060; }
    .vc-b-card.vc-b-best .vc-b-check-icon { border-color: #f0c060; }

    /* ── BUY NOW button ──────────────────────────────────────────────── */
    .vc-b-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      width: calc(100% - 32px);
      margin: 10px 16px 0;
      padding: 13px 10px 11px;
      border-radius: 8px;
      cursor: pointer;
      background: #cccccc;
      color: #333333;
      box-sizing: border-box;
      transition: filter 0.15s ease, transform 0.1s ease;
      position: relative;
      overflow: hidden;
    }
    .vc-b-btn-main {
      font-size: 17px;
      font-weight: 900;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      line-height: 1.1;
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .vc-b-btn-sub {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      opacity: 0.75;
      line-height: 1;
    }
    .vc-b-btn:hover { filter: brightness(1.07); }
    .vc-b-btn:active { transform: scale(0.98); }
    .vc-b-btn.vc-b-btn-best {
      background: #f5c518;
      color: #1a1a1a;
      box-shadow: 0 4px 16px rgba(245,197,24,0.40);
    }
    .vc-b-btn.vc-b-btn-best:hover { filter: brightness(1.08); }
    .vc-b-btn-cart-icon { flex-shrink: 0; }

    /* ── Payment icons ───────────────────────────────────────────────── */
    .vc-b-payment-icons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
      margin-top: 20px;
      padding: 0 12px;
      transform: scale(0.82);
      transform-origin: center;
    }

    /* ── Total row ───────────────────────────────────────────────────── */
    .vc-b-total-row {
      margin-top: 14px;
      text-align: center;
      font-size: 15px;
      font-weight: 700;
      color: #444;
    }
    .vc-b-card.vc-b-best .vc-b-total-row { color: rgba(255,255,255,0.75); }
    .vc-b-total-full {
      text-decoration: line-through;
      margin-right: 5px;
      opacity: 0.65;
      font-size: 14px;
    }
    .vc-b-total-now { font-weight: 900; color: #111; font-size: 16px; }
    .vc-b-card.vc-b-best .vc-b-total-now { color: #ffffff; }

    /* ── Shipping ────────────────────────────────────────────────────── */
    .vc-b-shipping {
      text-align: center;
      font-size: 14px;
      font-weight: 700;
      margin-top: 4px;
      color: #555;
    }
    .vc-b-shipping.free { color: #c87b1a; }
    .vc-b-card.vc-b-best .vc-b-shipping { color: rgba(255,255,255,0.65); }
    .vc-b-card.vc-b-best .vc-b-shipping.free { color: #f5c518; }

    /* ── Ripple ──────────────────────────────────────────────────────── */
    .vc-b-ripple-circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.35);
      transform: scale(0);
      animation: vc-b-ripple 0.55s linear;
      pointer-events: none;
    }
    @keyframes vc-b-ripple {
      to { transform: scale(2.5); opacity: 0; }
    }

    /* ── Animations ──────────────────────────────────────────────────── */
    @keyframes vc-b-fadeup {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .vc-b-card { animation: vc-b-fadeup 0.45s ease both; }
    .vc-b-card-wrap:nth-child(1) .vc-b-card { animation-delay: 0.05s; }
    .vc-b-card.vc-b-best     { animation-delay: 0.15s; }
    .vc-b-card-wrap:nth-child(3) .vc-b-card { animation-delay: 0.25s; }

    /* ── Variant B: light theme for side cards ───────────────────────── */
    .vc-b-theme-light .vc-b-card:not(.vc-b-best) {
      background: #ffffff;
      border-color: #c87b1a;
    }
    .vc-b-theme-dark .vc-b-card:not(.vc-b-best) {
      background: #f8f8f8;
      border-color: #c87b1a;
    }

    /* ── Responsive ──────────────────────────────────────────────────── */
    @media (max-width: 899px) {
      .vc-b-bump-wrapper { padding: 28px 12px 24px; }
      .vc-b-card { width: calc(100% - 32px); max-width: 480px; min-width: 320px; }
      .vc-b-card.vc-b-best { width: calc(100% - 32px); max-width: 500px; min-width: 320px; }
      .vc-b-price-amount { font-size: 52px; }
      .vc-b-card.vc-b-best .vc-b-price-amount { font-size: 60px; }
      .vc-b-bump-title { font-size: 17px; }
      .vc-b-bump-subtitle { font-size: 12px; margin-bottom: 24px; }
    }
  `;;;

  // ── Helpers ──────────────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('vc-b-bump-styles')) return;
    var style = document.createElement('style');
    style.id = 'vc-b-bump-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function getAttr(el, key, fallback) {
    return el.getAttribute('data-' + key) || fallback;
  }

  function buildCard(cfg) {
    var isBest = cfg.offer === 'promo';
    var imgSrc = IMAGES[String(cfg.bottles)] || '';
    var shippingFree = (cfg.shipping === 'Free' || cfg.shipping === '0' || cfg.shipping === '');
    var perBottle = cfg.valueRound === 'yes'
      ? Math.round(cfg.total / cfg.bottles)
      : (cfg.total / cfg.bottles).toFixed(2);
    var savings = cfg.full - cfg.total;

    var cartSVG = '<svg class="vc-b-btn-cart-icon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>';
    var checkSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5,5 4,7.5 8.5,2.5"/></svg>';

    var wrap = document.createElement('div');
    wrap.className = 'vc-b-card-wrap';

    if (isBest) {
      var bestLabel = document.createElement('div');
      bestLabel.className = 'vc-b-best-offer-label';
      bestLabel.innerHTML = '&#9733; BEST OFFER! &#9733;';
      wrap.appendChild(bestLabel);
    }

    var card = document.createElement('a');
    card.setAttribute('data-vc-href', cfg.href);
    card.className = 'vc-b-card smartplayer-click-event' + (isBest ? ' vc-b-best' : '');
    card.setAttribute('role', 'link');
    card.setAttribute('data-version', VERSION);
    card.style.cursor = 'pointer';

    var inner = '';

    // Header bar
    inner += '<div class="vc-b-card-header">';
    inner += '<div class="vc-b-card-headline">' + cfg.headline + '</div>';
    inner += '<div class="vc-b-card-desc">' + cfg.description + '</div>';
    inner += '</div>';

    // Bottles count
    inner += '<div class="vc-b-bottles-headline">';
    inner += '<span class="vc-b-bottles-count">' + cfg.bottles + ' BOTTLES</span>';
    inner += '<span class="vc-b-bottles-label">' + (cfg.bottles * 30) + ' Day Supply</span>';
    inner += '</div>';

    // Image
    inner += '<div class="vc-b-img-wrap">';
    if (imgSrc) {
      inner += '<img src="' + imgSrc + '" alt="' + cfg.bottles + ' bottles" loading="lazy" />';
    }
    inner += '</div>';

    // Price block
    inner += '<div class="vc-b-price-block">';
    inner += '<span class="vc-b-price-dollar">$</span>';
    inner += '<span class="vc-b-price-amount">' + perBottle + '</span>';
    inner += '<span class="vc-b-price-unit">Per<br>Bottle</span>';
    inner += '</div>';

    // Checklist
    inner += '<div class="vc-b-checklist">';
    inner += '<div class="vc-b-check-row vc-b-save-row">';
    inner += '<span class="vc-b-check-icon">' + checkSVG + '</span>';
    inner += '<span class="vc-b-save-text">YOU SAVE $' + savings + '</span>';
    inner += '</div>';
    if (isBest) {
      inner += '<div class="vc-b-check-row">';
      inner += '<span class="vc-b-check-icon">' + checkSVG + '</span>';
      inner += '<span>BIGGEST DISCOUNT</span>';
      inner += '</div>';
    }
    inner += '<div class="vc-b-check-row">';
    inner += '<span class="vc-b-check-icon">' + checkSVG + '</span>';
    inner += '<span>' + cfg.guarantee + ' DAYS GUARANTEE</span>';
    inner += '</div>';
    inner += '</div>';

    // BUY NOW button — two-line for best, single line for others
    var extraBtnClass = cfg.buttonClass ? ' ' + cfg.buttonClass : '';
    var btnClass = 'vc-b-btn' + (isBest ? ' vc-b-btn-best' : '') + ' smartplayer-click-event' + extraBtnClass;
    inner += '<span class="' + btnClass + '" data-version="' + VERSION + '">';
    inner += '<span class="vc-b-btn-main">' + cartSVG + (cfg.buttonText || 'BUY NOW!') + '</span>';
    if (isBest && cfg.aux) {
      inner += '<span class="vc-b-btn-sub">' + cfg.aux + '</span>';
    }
    inner += '</span>';

    // Payment icons
    inner += '<div class="vc-b-payment-icons">' + paymentIconsHTML() + '</div>';

    // Total row
    inner += '<div class="vc-b-total-row">';
    inner += 'TOTAL: <span class="vc-b-total-full">$' + cfg.full + '</span>';
    inner += '<span class="vc-b-total-now">$' + cfg.total + '</span>';
    inner += '</div>';

    // Shipping
    inner += '<div class="vc-b-shipping ' + (shippingFree ? 'free' : 'paid') + '">';
    inner += shippingFree ? '+ FREE SHIPPING' : '+ $' + cfg.shipping + ' SHIPPING';
    inner += '</div>';

    card.innerHTML = inner;

    // Click handler
    card.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var btn = card.querySelector('.vc-b-btn');
      if (btn) {
        var rect = btn.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height) * 1.2;
        var x = e.clientX - rect.left - size / 2;
        var y = e.clientY - rect.top  - size / 2;
        var circle = document.createElement('span');
        circle.className = 'vc-b-ripple-circle';
        circle.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px;';
        btn.appendChild(circle);
        circle.addEventListener('animationend', function () { circle.remove(); });
      }
      var dest = card.getAttribute('data-vc-href') || cfg.href;
      if (dest && dest !== '#') {
        setTimeout(function () { window.location.href = dest; }, 120);
      }
    });

    wrap.appendChild(card);
    return wrap;
  }

  // ── A/B test helper ──────────────────────────────────────────────────────
  function getVariant(forced) {
    return 'B';
  }

  // ── Main render ──────────────────────────────────────────────────────────
  function render(container) {
    injectStyles();

    var forceVariant = getAttr(container, 'ab-variant', '');
    var variant = getVariant(forceVariant || null);
    // Theme is determined by data-theme attribute on the .vc-b-bump container.
    // Allowed values: 'dark' → vc-b-theme-dark, anything else → light (default).
    // If not set, falls back to variant B = dark for A/B testing.
    var explicitTheme = getAttr(container, 'theme', '');
    var theme = explicitTheme === 'dark'
      ? 'vc-b-theme-dark'
      : (explicitTheme === 'light' ? '' : (variant === 'B' ? 'vc-b-theme-dark' : 'vc-b-theme-light'));

    // Only render title/subtitle when the attributes are explicitly set and non-empty
    var title    = container.hasAttribute('data-title')    ? container.getAttribute('data-title')    : '';
    var subtitle = container.hasAttribute('data-subtitle') ? container.getAttribute('data-subtitle') : '';

    var wrapper = document.createElement('div');
    wrapper.className = 'vc-b-bump-wrapper ' + theme;

    var headerHTML = '';
    if (title)    headerHTML += '<div class="vc-b-bump-title">'    + title    + '</div>';
    if (subtitle) headerHTML += '<div class="vc-b-bump-subtitle">' + subtitle + '</div>';
    wrapper.innerHTML = headerHTML;

    var grid = document.createElement('div');
    grid.className = 'vc-b-bump-grid';

    var offerEls = container.querySelectorAll('.vc-b-offer');
    if (offerEls.length === 0) {
      offerEls = [container];
    }

    // Build offer array preserving DOM order
    var offerArr = Array.prototype.slice.call(offerEls);

    // Default order map by offer type:
    //   Desktop: promo=1 (left), basic=2 (center), mid=3 (right)  → 6 / 2 / 3 bottles
    //   Mobile:  promo=1 (top),  mid=2,            basic=3 (bottom) → 6 / 3 / 2 bottles
    var DEFAULT_DESKTOP = { promo: 1, basic: 2, mid: 3 };
    var DEFAULT_MOBILE  = { promo: 1, mid: 2,   basic: 3 };

    offerArr.forEach(function (el, domIdx) {
      var offerType = getAttr(el, 'offer', 'basic');
      var cfg = {
        href:          el.getAttribute('data-vc-original-href') || el.getAttribute('data-href') || el.getAttribute('href') || '#',
        offer:         offerType,
        headline:      getAttr(el, 'headline',      'Package'),
        description:   getAttr(el, 'description',   ''),
        bottles:       parseInt(getAttr(el, 'bottles', '1'), 10),
        guarantee:     getAttr(el, 'guarantee',     '30'),
        total:         parseFloat(getAttr(el, 'total', '0')),
        full:          parseFloat(getAttr(el, 'full',  '0')),
        shipping:      getAttr(el, 'shipping',      'Free'),
        valueRound:    getAttr(el, 'value-round',   'no'),
        buttonText:    getAttr(el, 'button-text',   'BUY NOW'),
        aux:           getAttr(el, 'aux',            ''),
        buttonClass:   getAttr(el, 'button-class',  ''),
        // data-order: mobile position (1=top). data-desktop-order: desktop position (1=left).
        // Falls back to defaults by offer type if not specified.
        mobileOrder:  el.hasAttribute('data-order')
          ? parseInt(el.getAttribute('data-order'), 10)
          : (DEFAULT_MOBILE[offerType]  || domIdx + 1),
        desktopOrder: el.hasAttribute('data-desktop-order')
          ? parseInt(el.getAttribute('data-desktop-order'), 10)
          : (DEFAULT_DESKTOP[offerType] || domIdx + 1),
      };
      var wrap = buildCard(cfg);
      // Apply order via CSS custom properties (read by media-query rules)
      wrap.style.setProperty('--vc-order-mobile',  String(cfg.mobileOrder));
      wrap.style.setProperty('--vc-order-desktop', String(cfg.desktopOrder));
      grid.appendChild(wrap);
    });

    wrapper.appendChild(grid);
    container.innerHTML = '';
    container.appendChild(wrapper);

    container.dispatchEvent(new CustomEvent('vc:rendered', {
      bubbles: true,
      detail: { variant: variant }
    }));
  }

  // ── Preserve original hrefs before any platform script mutates them ────────
  // Atomicat (atomicpixel.js) replaces href with a javascript: URI for tracking.
  // We snapshot the real URL immediately into data-vc-original-href so it
  // survives any later mutation.
  var _hrefCache = {};
  var _hrefCacheIdx = 0;

  function snapshotHrefs() {
    document.querySelectorAll('.vc-b-offer').forEach(function (el) {
      if (!el.hasAttribute('data-vc-original-href')) {
        var raw = el.getAttribute('href') || el.getAttribute('data-href') || '';
        // Only store if it looks like a real URL (not already a javascript: URI)
        if (raw && raw.indexOf('javascript:') !== 0) {
          el.setAttribute('data-vc-original-href', raw);
        }
      }
    });
  }

  // Run immediately (synchronously) so we beat any deferred platform scripts
  snapshotHrefs();

  // Also watch for dynamically added .vc-b-offer elements
  if (typeof MutationObserver !== 'undefined') {
    var _mo = new MutationObserver(function () { snapshotHrefs(); });
    _mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });
  }

  // ── Auto-init ────────────────────────────────────────────────────────────
  function init() {
    document.querySelectorAll('.vc-b-bump').forEach(render);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  global.VitaceptBump = { render: render, init: init };

}(window));