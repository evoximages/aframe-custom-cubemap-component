## aframe-custom-cubemap-component

A Custom Cubemap component to load Evox Images interior vehicle assets

For [A-Frame](https://aframe.io).

  - [API](#api)
  - [Installation](#installation)
    - [Browser](#browser)
  - [Usage](#usage)
    - [Locally hosted images](#locally-hosted-images)
    - [API fetched images](#api-fetched-images)
### API

| Property     | Description                                                             | Default Value                                            | Options             |
| ------------ | ----------------------------------------------------------------------- | -------------------------------------------------------- | ------------------- |
| folder       | Path to local asset folder                                              | ' '                                                      |                     |
| edgeLength   | Controls the dimensions of the skybox                                   | 500                                                      |                     |
| ext          | The image extension                                                     | png                                                      | jpg / png           |
| transparent  | Toggle transparency for png                                             | false                                                    | true / false        |
| stereo       | Controls the layer on which the image is rendered.                      | both                                                     | both / left / right |
| eye          | Fetch either left or right eye asset (*API use only)                    | \_L_                                                     | \_L_  / \_R_        |
| vif          | Vehicle vifnum *API use only                                            | none                                                     |                     |
| key          | API key **API use only                                                  | none                                                     |                     |
| localSrcUrls | Local image naming scheme that maps to the skybox. **Order is important | `['1.png', '3.png', '4.png', '5.png', '0.png', '2.png']` |                     |
| background   | Set as true if cubemap is used for background                           | false                                                    |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

### Usage

#### Locally hosted images
```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
  <script src="aframe-custom-cubemap-component.min.js"></script>
</head>

<body>
  <a-scene rotation="0 180 0" vr-mode-ui="enabled: false">
    <a-entity custom-cubemap="folder:AIL13225_pavr;transparent:true;"></a-entity>
    <a-entity custom-cubemap="folder:showroom_int;background:true;"></a-entity>
  </a-scene>
</body>
```
![screen1](public/screen1.png)
![screen2](public/screen2.png)
![screen3](public/screen3.png)

#### API fetched images
```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
  <script src="aframe-custom-cubemap-component.min.js"></script>
</head>

<body>
  <a-scene rotation="0 180 0" vr-mode-ui="enabled: false"> <!-- Rotate the scene to adjust for a flipped bottom image-->
    <a-entity custom-cubemap="vif:12626; key:{client_api_key}; eye:_L_; transparent:true;"></a-entity>
  </a-scene>
</body>
```
![screen4](public/screen4.png)
![screen5](public/screen5.png)
![screen6](public/screen6.png)

