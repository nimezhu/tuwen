const downloadPng = (canvas, fn = "newplot") => {
    var link = document.createElement("a");
    link.setAttribute("download", fn + ".png");
    canvas.toBlob(function (blob) {
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, "image/png");
}

export default downloadPng


