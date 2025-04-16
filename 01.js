function btn() {
  document.querySelector(".inpu").click();
}


function uploadImages() {
  const input = document.getElementById('images');
  const files = input.files;

  if (!files.length) {
    alert('Please select at least one image');
    return;
  }

  const imagesData = [];

  const readerPromises = Array.from(files).map(file => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => {
        imagesData.push({
          name: file.name,
          type: file.type,
          size: file.size,
          data: reader.result
        });
        resolve();
      };
      reader.readAsDataURL(file);
    });
  });

  Promise.all(readerPromises).then(() => {
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(imagesData)
    })
    .then(res => res.text())
    .then(msg => alert(msg))
    .catch(err => alert('Error: ' + err));
    showimg();
  });
};


function showimg() {
  fetch('http://localhost:3000/upload')
  .then(r => r.json())
  .then(f => {
    f.forEach(file => {
      let img = new Image();
      img.src = file.data;
      document.querySelector(".show").appendChild(img);
    })
  });
}
showimg();