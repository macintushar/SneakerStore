import React from 'react';
import { createUploadWidget } from 'cloudinary';

function ShowUploadWidget() {
  const uploadWidget = React.useRef(null);

  const handleUpload = (event) => {
    event.preventDefault();
    uploadWidget.current.open();
  };

  React.useEffect(() => {
    const options = {
      cloudName: "dhzdzjgtd",
      uploadPreset: "<upload preset>",
      sources: [
        "local",
        "url",
        "instagram",
        "google_drive"
      ],
      googleApiKey: "<image_search_google_api_key>",
      showAdvancedOptions: true,
      cropping: true,
      multiple: false,
      defaultSource: "local",
      styles: {
        palette: {
          window: "#000000",
          sourceBg: "#F9F9F9",
          windowBorder: "#90a0b3",
          tabIcon: "#0094c7",
          inactiveTabIcon: "#69778A",
          menuIcons: "#0094C7",
          link: "#53ad9d",
          action: "#8F5DA5",
          inProgress: "#0194c7",
          complete: "#53ad9d",
          error: "#c43737",
          textDark: "#000000",
          textLight: "#FFFFFF"
        },
        fonts: {
          default: null,
          "'Poppins', sans-serif": {
            url: "https://fonts.googleapis.com/css?family=Poppins",
            active: true
          }
        }
      }
    };

    uploadWidget.current = createUploadWidget(options, (err, info) => {
      if (!err) {
        console.log("Upload Widget event - ", info);
      }
    });
  }, []);

  return (
    <div>
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}

export default ShowUploadWidget;
