# RubberBand

I really love Responsive Web Design, I think it's great and I think you should love it too, but it isn't the easiest thing to do. I took inspiration from the [Golden Grid System](http://goldengridsystem.com/ "see the GGS for yourself"). I was amazed by it's simplicity and ingenuity, but it did some things I didn't quite agree with, so I set about making my own, then designed some tools to help speed up the process. The result is what you can see here.

## A Responsive Web Development Tool

So, what is __RubberBand__? It's a light-weight, versatile and simple to use tool to help you develop responsive websites. Below are a few features and a how to guide where you can find out how to get started, how to use the tool and some of the options you can define to customize your setup. First of all though, some bit that __RubberBand__ does.

### Responsive Columns &amp; Baselines

Depending on your browser or device, you'll be shown a group of columns consisting of four (mobile), eight (tablet) or sixteen (desktop, large screen). As the browser resizes so too will the columns, baselines and the amount of them. __RubberBand__ allows you to easily lay out your content across any device.

### CSS Calculator

__RubberBand__ relies heavily on percentages and calculating ems instead of relying on the good 'ol pixels. Because of that you will most likely be doing lots of calculations, new font-sizes, line-heights, margins and padding. __RubberBand__ is there to simplify some the process and offers a calculator. All you do now is type your desired font-size and have the CSS generated for you, speedy!

### Viewport Switching

There will come a time when you want to see how your page will look in smaller windows, resizing a browser manually is annoying and you may just want to see your design quickly at a certain width without having to upload and view through an actual mobile device. __RubberBand__ can help with that, meaning making changes is that little bit faster.

## How To...

### ...Get Started

I am going to assume you've already downloaded either the normal or minified _(recommended)_ version of __RubberBand__, put it in your website's Javascript directory and referenced it in the footer of your __HTML__, if not, you should definitely do that now.

#### html5

`<script src="/my-javascript-dir/rubberband.min.js"></script>`

#### html4/xhtml

`<script src="/my-javascript-dir/rubberband.min.js" type="text/javascript"></script>`

You should hopefully see a small box in the top right corner of your webpage with a little down arrow icon. Hovering this will show __RubberBand__. If you can't see __RubberBand__, double check the path to the Javascript is correct.

#### ...Set Some Defaults

Now you have __RubberBand__ showing, it's best to set some defaults.

##### HTML

You want to let your webpage know it should try and look good on a mobile device, you can do this using the following piece of __HTML__.

`<meta name="viewport" content="width=device-width, initial-scale=1, target-densitydpi=device-dpi" />`

It's as simple as that, with this line of code you tell the site to be as wide as whatever device it is being viewed on and you don't want the content to be zoomed. For more information I suggest reading the following article on the subject [An introduction to meta viewport and @viewport](http://dev.opera.com/articles/view/an-introduction-to-meta-viewport-and-viewport/ "read more about the viewport meta")

##### CSS

For __CSS__ I highly recommend using a Reset stylesheet, like this one for instance, [Eric Meyer's](http://meyerweb.com/eric/tools/css/reset/reset.css). Once you have added your reset stylesheet, in your own stylesheet, make sure to set a default font-size and line-height. The way I decide these values is to choose a size for an average paragraph. If I don't want the average paragraph text to ever be bigger than 14 pixels and the line-height to be 1.5 &times; the size of the text, I will set my body text to include the following:

`body { font-size: 14px; line-height: 1.5em; }`

It is important to set these two initial values as all calculations will be driven from the values set in the body. If you are happy with the defaults, be sure to set a line-height regardless to make sure all browsers are using the same line-height.

### ...Choose Options

__RubberBand__ comes with some options that you can set which can help during your development.

<table>
  <tr>
    <th>Attribute</th>
    <th>Value</th>
    <th>Default</th>
    <th>Description</th>
  </tr>

  <tr>
    <td>showAlways</td>
    <td>boolean</td>
    <td>false</td>
    <td>If set to true, the tools will be shown always.</td>
  </tr>

  <tr>
    <td>hideColumns</td>
    <td>boolean</td>
    <td>false</td>
    <td>If set to true, columns will be hidden when the guide is on.</td>
  </tr>

  <tr>
    <td>hideBaseline</td>
    <td>boolean</td>
    <td>false</td>
    <td>If set to true, baselines will be hidden when the guide is on.</td>
  </tr>

  <tr>
    <td>mobileLandscape</td>
    <td>number</td>
    <td>640</td>
    <td>Change this value to show a different width for the mobile landscape view.</td>
  </tr>

  <tr>
    <td>mobilePortrait</td>
    <td>number</td>
    <td>480</td>
    <td>Change this value to show a different width for the mobile portrait view.</td>
  </tr>

  <tr>
    <td>tabletLandscape</td>
    <td>number</td>
    <td>1024</td>
    <td>Change this value to show a different width for the tablet landscape view.</td>
  </tr>

  <tr>
    <td>tabletPortrait</td>
    <td>number</td>
    <td>768</td>
    <td>Change this value to show a different width for the tablet portrait view.</td>
  </tr>
</table>

You can set these options by having a script tag in your footer, below the link to __RubberBand__. Here is an example of a setup which has the tools always showing, the baselines hidden and a mobile portrait view of 240 pixels.

    <script src="/my-javascript-dir/rubberband.min.js"></script>
    <script>
        rubberband.options({
            showAlways: true,
            hideBaseline: true,
            mobilePortrait: 240
        });
    </script>

## Using RubberBand

### RubberBand Columns

RubberBand's columns are set as % values and is based on 18 columns overall. The left and right most columns are set up as a natural border, some white-space that stops your content from ever being close up to the sides of the screen. That means the other 16 are available to use for content. The table below shows you how to calculate values between the columns based on which view you are in.

#### Mobile

<table>
  <tr>
    <th>col-1</th>
    <th>col-2</th>
    <th>col-3</th>
    <th>col-4</th>
  </tr>

  <tr>
    <td>25%</td>
    <td>50%</td>
    <td>75%</td>
    <td>100%</td>
  </tr>
</table>

#### Tablet

<table>
  <tr>
    <th>col-1</th>
    <th>col-2</th>
    <th>col-3</th>
    <th>col-4</th>
    <th>col-5</th>
    <th>col-6</th>
    <th>col-7</th>
    <th>col-8</th>
  </tr>

  <tr>
    <td>12.5%</td>
    <td>25%</td>
    <td>37.5%</td>
    <td>50%</td>
    <td>62.5%</td>
    <td>75%</td>
    <td>87.5%</td>
    <td>100%</td>
  </tr>
</table>

#### Desktop

<table>
  <tr>
    <th>col-1</th>
    <th>col-2</th>
    <th>col-3</th>
    <th>col-4</th>
    <th>col-5</th>
    <th>col-6</th>
    <th>col-7</th>
    <th>col-8</th>
  </tr>

  <tr>
    <td>6.25%</td>
    <td>12.5%</td>
    <td>18.75%</td>
    <td>25%</td>
    <td>31.25%</td>
    <td>37.5%</td>
    <td>43.75%</td>
    <td>50%</td>
  </tr>
</table>

<table>
  <tr>
    <th>col-9</th>
    <th>col-10</th>
    <th>col-11</th>
    <th>col-12</th>
    <th>col-13</th>
    <th>col-14</th>
    <th>col-15</th>
    <th>col-16</th>
  </tr>

  <tr>
    <td>56.25%</td>
    <td>62.5%</td>
    <td>68.75%</td>
    <td>75%</td>
    <td>81.25%</td>
    <td>87.5%</td>
    <td>93.75%</td>
    <td>100%</td>
  </tr>
</table>

### Using A Wrapper

It's a good idea to use a wrapper for your whole site. You may want a 100% site design, but I'd still put in the wrapper. This is what I do.

    <div id="wrapper">
        [SITE CONTENT]
    </div>

By doing this it makes the process of positioning the content centrely, a whole lot easier. For Mobile and Tablet devices I suggest setting the wrapper margin to the below.

    /* Natural wrapper */
    #wrapper { margin: 0 5.555555555555556% }

For _Desktop_ you can use whatever you like, to work out the percentage remember to do the following. 100 % 18 &times; [number of columns either side] = [wrapper margin]%. So here is a quick example, you want three columns on the left and right, you would do the following. 100 % 18 &times; 3 = 16.66666666666667%. Your CSS should be:

    /* 3 column wrapper */
    #wrapper { margin: 0 16.66666666666667% }

### Laying Out Content

First thing I suggest doing is setting a global __P__ to have the default CSS that the __RubberBand__ calculator gives you if you type in the base font-size. So if the base font-size is 16px, then type 16 into the calculator and copy the output CSS into your stylesheet.

`p { margin: 1.5em 0; padding: 0 0.75em; font-size: 1em; line-height: 1.5em; }`

This gives you a nice basis to work from when organise other elements around your content. When dealing with padding and a width defined, you may notice that your content does not sit within the columns. if this occurs I suggest that, at the bottom of your page you have the following:

`[a whole bunch of elements] { -moz-box-sizing: border-box; -webkit-box-sizing: border-box; -o-box-sizing: border-box; -ms-box-sizing: border-box; box-sizing: border-box; }`

This will allow the padding to be considered part of the overall width of the element so instead of an element being, for example, 25% + padding, it will be 25% including padding.

## Feeding Back

If you have any difficults using __RubberBand__, find a bug or have a suggestion on ways to improve the tool please email me here.
[Adam Johnston](mailto:rubberband@adamjohnston.co.uk)