import { PHOTO_ICON } from '../../../../../constants/imagePath.js';

export default function ImageUploader({ $target, onImageUploadHandler, counts }) {
  this.state = {
    counts,
  };
  this.$ImageUploader = document.createElement('input');
  this.$ImageUploader.type = 'file';
  this.$ImageUploader.multiple = true;
  this.$ImageUploader.hidden = true; // 숨겨야한다.
  this.$ImageUploader.accept = '.jpg, .jpeg, .png';

  this.$imageUploadButton = document.createElement('button');
  this.$imageUploadButton.className = 'image_Upload_Button';
  this.$icon = document.createElement('img');
  this.$icon.src = PHOTO_ICON;

  this.$countBox = document.createElement('span');

  $target.appendChild(this.$imageUploadButton);
  this.$imageUploadButton.appendChild(this.$icon);
  this.$imageUploadButton.appendChild(this.$countBox);

  this.$imageUploadButton.addEventListener('click', () => {
    this.$ImageUploader.click();
  });

  this.$ImageUploader.addEventListener('change', (e) => {
    const addFiles = {};
    const addUrls = {};
    Array.prototype.forEach.call(e.target.files, (f) => {
      const imageUrl = URL.createObjectURL(f);
      addFiles[f.name] = f;
      addUrls[f.name] = imageUrl;
    }); //
    onImageUploadHandler(addUrls, addFiles);
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.counts === 10) {
      this.$imageUploadButton.disabled = true;
    }
    this.$countBox.innerText = `${this.state.counts} / 10`;
  };

  this.render();
}
