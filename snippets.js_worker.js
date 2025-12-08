const TG_BOT_TOKEN = 'TG机器人Token';
const TG_CHAT_ID = 'TG账号id';
let request;
let url;

export default {
  async fetch(request0) {
    request = request0;
    url = new URL(request0.url);
    // console.log(request);

    const { pathname } = new URL(request.url);
    switch (pathname) {
      case '/':
        return await handleRootRequest();
      case '/get':
        return await handleGetFile();
      case '/upload':
        return request.method === 'POST' ? await handleUploadRequest() : new Response('Method Not Allowed', { status: 405 });
      case '/bing-images':
        return handleBingImagesRequest();
    }
  }
};


async function handleRootRequest() {
  const response = new Response(`
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>免费图床文件服务</title>
  <link rel="icon" href="https://dash.cloudflare.com/favicon.ico" type="image/x-icon">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.1/css/bootstrap.min.css" integrity="sha512-T584yQ/tdRR5QwOpfvDfVQUidzfgc2339Lc8uBDtcp/wYu80d7jwBgAxbyMh0a9YM9F8N3tdErpFI8iaGx6x5g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.2.7/css/fileinput.min.css" integrity="sha512-qPjB0hQKYTx1Za9Xip5h0PXcxaR1cRbHuZHo9z+gb5IgM6ZOTtIH4QLITCxcCp/8RMXtw2Z85MIZLv6LfGTLiw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.css" integrity="sha512-6S2HWzVFxruDlZxI3sXOZZ4/eJ8AcxkQH1+JjSe/ONCEqR9L4Ysq5JdT5ipqtzU7WHalNwzwBv+iE51gNHJNqQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <style>
      body {
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          position: relative;
      }
      .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          z-index: -1;
          transition: opacity 1s ease-in-out;
          opacity: 1;
      }
      .card {
          background-color: rgba(255, 255, 255, 0.8);
          border: none;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          padding: 20px;
          width: 90%;
          max-width: 400px;
          text-align: center;
          margin: 0 auto;
          position: relative;
      }
      .uniform-height {
          margin-top: 20px;
      }
      #viewCacheBtn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          color: rgba(0, 0, 0, 0.1);
          cursor: pointer;
          font-size: 24px;
          transition: color 0.3s ease;
      }
      #viewCacheBtn:hover {
          color: rgba(0, 0, 0, 0.4);
      }
      #compressionToggleBtn {
          position: absolute;
          top: 10px;
          right: 50px;
          background: none;
          border: none;
          color: rgba(0, 0, 0, 0.1);
          cursor: pointer;
          font-size: 24px;
          transition: color 0.3s ease;
      }
      #compressionToggleBtn:hover {
          color: rgba(0, 0, 0, 0.4);
      }
      #cacheContent {
          margin-top: 20px;
          max-height: 200px;
          border-radius: 5px;
          overflow-y: auto;
      }
      .cache-title {
          text-align: left;
          margin-bottom: 10px;
      }
      .cache-item {
          display: block;
          cursor: pointer;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s ease;
          text-align: left;
          padding: 10px;
      }
      .cache-item:hover {
          background-color: #e9ecef;
      }
      .project-link {
          font-size: 14px;
          text-align: center;
          margin-top: 5px;
          margin-bottom: 0;
      }
      textarea.form-control {
          max-height: 200px;
          overflow-y: hidden;
          resize: none;
      }
  </style>
</head>
<body>
  <div class="background" id="background"></div>
  <div class="card">
      <div class="title">免费图床文件服务, 限制<20MB</div>
      <button type="button" class="btn" id="viewCacheBtn" title="查看历史记录"><i class="fas fa-clock"></i></button>
      <!-- <button type="button" class="btn" id="compressionToggleBtn"><i class="fas fa-compress"></i></button> -->
      <div class="card-body">
          <form id="uploadForm" action="/upload" method="post" enctype="multipart/form-data">
              <div class="file-input-container">
                  <input id="fileInput" name="file" type="file" class="form-control-file" data-browse-on-zone-click="true" multiple>
              </div>
              <div class="form-group mb-3 uniform-height" style="display: none;">
                  <button type="button" class="btn btn-light mr-2" id="urlBtn">URL</button>
                  <button type="button" class="btn btn-light mr-2" id="bbcodeBtn">BBCode</button>
                  <button type="button" class="btn btn-light" id="markdownBtn">Markdown</button>
              </div>
              <div class="form-group mb-3 uniform-height" style="display: none;">
                  <textarea class="form-control" id="fileLink" readonly></textarea>
              </div>
              <div id="cacheContent" style="display: none;"></div>
          </form>
      </div>
      <div class="title">CloudFlare家Snippets/Worker/Pages部署TG图床</div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.2.7/js/fileinput.min.js" integrity="sha512-CCLv901EuJXf3k0OrE5qix8s2HaCDpjeBERR2wVHUwzEIc7jfiK9wqJFssyMOc1lJ/KvYKsDenzxbDTAQ4nh1w==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.2.7/js/locales/zh.min.js" integrity="sha512-IizKWmZY3aznnbFx/Gj8ybkRyKk7wm+d7MKmEgOMRQDN1D1wmnDRupfXn6X04pwIyKFWsmFVgrcl0j6W3Z5FDQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js" integrity="sha512-lbwH47l/tPXJYG9AcFNoJaTMhGvYWhVM9YI43CT+uteTRRaiLCui8snIgyAN8XWgNjNhCqlAUdzZptso6OCoFQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      <script>
      async function fetchBingImages() {
        const response = await fetch('/bing-images');
        const data = await response.json();
        return data.data.map(image => image.url);
      }
    
      async function setBackgroundImages() {
        const images = await fetchBingImages();
        const backgroundDiv = document.getElementById('background');
        if (images.length > 0) {
          backgroundDiv.style.backgroundImage = 'url(' + images[0] + ')';
        }
        let index = 0;
        let currentBackgroundDiv = backgroundDiv;
        setInterval(() => {
          const nextIndex = (index + 1) % images.length;
          const nextBackgroundDiv = document.createElement('div');
          nextBackgroundDiv.className = 'background next';
          nextBackgroundDiv.style.backgroundImage = 'url(' + images[nextIndex] + ')';
          document.body.appendChild(nextBackgroundDiv);
          nextBackgroundDiv.style.opacity = 0;
          setTimeout(() => {
            nextBackgroundDiv.style.opacity = 1;
          }, 50);
          setTimeout(() => {
            document.body.removeChild(currentBackgroundDiv);
            currentBackgroundDiv = nextBackgroundDiv;
            index = nextIndex;
          }, 1000);
        }, 5000);
      }
    
      $(document).ready(function() {
        let originalImageURLs = [];
        let isCacheVisible = false;
        let enableCompression = true;
        initFileInput();
        setBackgroundImages();
    
        const tooltipText = enableCompression ? '关闭压缩' : '开启压缩';
        $('#compressionToggleBtn').attr('title', tooltipText);
        $('#compressionToggleBtn').on('click', function() {
            enableCompression = !enableCompression;
            const icon = $(this).find('i');
            icon.toggleClass('fa-compress fa-expand');
            const tooltipText = enableCompression ? '关闭压缩' : '开启压缩';
            $(this).attr('title', tooltipText);
        });
    
        function initFileInput() {
          $("#fileInput").fileinput({
            theme: 'fa',
            language: 'zh',
            browseClass: "btn btn-primary",
            removeClass: "btn btn-danger",
            showUpload: false,
            showPreview: false,
          }).on('filebatchselected', handleFileSelection)
            .on('fileclear', handleFileClear);
        }
    
        async function handleFileSelection() {
          const files = $('#fileInput')[0].files;
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileHash = await calculateFileHash(file);
            const cachedData = getCachedData(fileHash);
            if (cachedData) {
                handleCachedFile(cachedData);
            } else {
                await uploadFile(file, fileHash);
            }
          }
        }
    
        function getCachedData(fileHash) {
            const cacheData = JSON.parse(localStorage.getItem('uploadCache')) || [];
            return cacheData.find(item => item.hash === fileHash);
        }
    
        function handleCachedFile(cachedData) {
            if (!originalImageURLs.includes(cachedData.url)) {
                originalImageURLs.push(cachedData.url);
                updateFileLinkDisplay();
                toastr.info('已从缓存中读取数据');
            }
        }
    
        function updateFileLinkDisplay() {
            $('#fileLink').val(originalImageURLs.join('\\n\\n'));
            $('.form-group').show();
            adjustTextareaHeight($('#fileLink')[0]);
        }
    
        async function calculateFileHash(file) {
          const arrayBuffer = await file.arrayBuffer();
          const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        }
    
        function isFileInCache(fileHash) {
          const cacheData = JSON.parse(localStorage.getItem('uploadCache')) || [];
          return cacheData.some(item => item.hash === fileHash);
        }
    
        async function uploadFile(file, fileHash) {
          try {
            toastr.info('上传中...', '', { timeOut: 0 });
            const interfaceInfo = {
              enableCompression: enableCompression
            };
            if (file.type.startsWith('image/') && file.type !== 'image/gif' && interfaceInfo.enableCompression) {
              toastr.info('正在压缩...', '', { timeOut: 0 });
              const compressedFile = await compressImage(file);
              file = compressedFile;
            }
            const formData = new FormData($('#uploadForm')[0]);
            formData.set('file', file, file.name);
            const uploadResponse = await fetch('/upload', { method: 'POST', body: formData });
            const responseData = await handleUploadResponse(uploadResponse);
            if (responseData.error) {
              toastr.error(responseData.error);
            } else {
              originalImageURLs.push(responseData.data);
              $('#fileLink').val(originalImageURLs.join('\\n\\n'));
              $('.form-group').show();
              adjustTextareaHeight($('#fileLink')[0]);
              toastr.success('文件上传成功！');
              saveToLocalCache(responseData.data, file.name, fileHash);
            }
          } catch (error) {
            console.error('处理文件时出现错误:', error);
            $('#fileLink').val('文件处理失败！');
            toastr.error('文件处理失败！');
          } finally {
            toastr.clear();
          }
        }
    
        async function handleUploadResponse(response) {
          if (response.ok) {
            return await response.json();
          } else {
            const errorData = await response.json();
            return { error: errorData.error };
          }
        }
    
        $(document).on('paste', async function(event) {
          const clipboardData = event.originalEvent.clipboardData;
          if (clipboardData && clipboardData.items) {
            for (let i = 0; i < clipboardData.items.length; i++) {
              const item = clipboardData.items[i];
              if (item.kind === 'file') {
                const pasteFile = item.getAsFile();
                const dataTransfer = new DataTransfer();
                const existingFiles = $('#fileInput')[0].files;
                for (let j = 0; j < existingFiles.length; j++) {
                  dataTransfer.items.add(existingFiles[j]);
                }
                dataTransfer.items.add(pasteFile);
                $('#fileInput')[0].files = dataTransfer.files;
                $('#fileInput').trigger('change');
                break;
              }
            }
          }
        });
    
        async function compressImage(file, quality = 0.75) {
          return new Promise((resolve) => {
            const image = new Image();
            image.onload = () => {
              const targetWidth = image.width;
              const targetHeight = image.height;
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = targetWidth;
              canvas.height = targetHeight;
              ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
              canvas.toBlob((blob) => {
                const compressedFile = new File([blob], file.name, { type: 'image/jpeg' });
                toastr.success('图片压缩成功！');
                resolve(compressedFile);
              }, 'image/jpeg', quality);
            };
            const reader = new FileReader();
            reader.onload = (event) => {
              image.src = event.target.result;
            };
            reader.readAsDataURL(file);
          });
        }
    
        $('#urlBtn, #bbcodeBtn, #markdownBtn').on('click', function() {
          const fileLinks = originalImageURLs.map(url => url.trim()).filter(url => url !== '');
          if (fileLinks.length > 0) {
            let formattedLinks = '';
            switch ($(this).attr('id')) {
              case 'urlBtn':
                formattedLinks = fileLinks.join('\\n\\n');
                break;
              case 'bbcodeBtn':
                formattedLinks = fileLinks.map(url => '[img]' + url + '[/img]').join('\\n\\n');
                break;
              case 'markdownBtn':
                formattedLinks = fileLinks.map(url => '![image](' + url + ')').join('\\n\\n');
                break;
              default:
                formattedLinks = fileLinks.join('\\n');
            }
            $('#fileLink').val(formattedLinks);
            adjustTextareaHeight($('#fileLink')[0]);
            copyToClipboardWithToastr(formattedLinks);
          }
        });
    
        function handleFileClear(event) {
          $('#fileLink').val('');
          adjustTextareaHeight($('#fileLink')[0]);
          hideButtonsAndTextarea();
          originalImageURLs = [];
        }
    
        function adjustTextareaHeight(textarea) {
          textarea.style.height = '1px';
          textarea.style.height = (textarea.scrollHeight > 200 ? 200 : textarea.scrollHeight) + 'px';
    
          if (textarea.scrollHeight > 200) {
            textarea.style.overflowY = 'auto';
          } else {
            textarea.style.overflowY = 'hidden';
          }
        }
    
        function copyToClipboardWithToastr(text) {
          const input = document.createElement('textarea');
          input.value = text;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
          toastr.success('已复制到剪贴板', '', { timeOut: 300 });
        }
    
        function hideButtonsAndTextarea() {
          $('#urlBtn, #bbcodeBtn, #markdownBtn, #fileLink').parent('.form-group').hide();
        }
    
        function saveToLocalCache(url, fileName, fileHash) {
          const timestamp = new Date().toLocaleString('zh-CN', { hour12: false });
          const cacheData = JSON.parse(localStorage.getItem('uploadCache')) || [];
          cacheData.push({ url, fileName, hash: fileHash, timestamp });
          localStorage.setItem('uploadCache', JSON.stringify(cacheData));
        }
    
        $('#viewCacheBtn').on('click', function() {
          const cacheData = JSON.parse(localStorage.getItem('uploadCache')) || [];
          const cacheContent = $('#cacheContent');
          cacheContent.empty();
          if (isCacheVisible) {
            cacheContent.hide();
            $('#fileLink').val('');
            $('#fileLink').parent('.form-group').hide();
            isCacheVisible = false;
          } else {
            if (cacheData.length > 0) {
              cacheData.reverse();
              cacheData.forEach((item) => {
                const listItem = $('<div class="cache-item"></div>')
                  .text(item.timestamp + ' - ' + item.fileName)
                  .data('url', item.url);
                cacheContent.append(listItem);
                cacheContent.append('<br>');
              });
              cacheContent.show();
            } else {
              cacheContent.append('<div>还没有记录哦！</div>').show();
            }
            isCacheVisible = true;
          }
        });
    
        $(document).on('click', '.cache-item', function() {
          const url = $(this).data('url');
          originalImageURLs = [];
          $('#fileLink').val('');
          originalImageURLs.push(url);
          $('#fileLink').val(originalImageURLs.map(url => url.trim()).join('\\n\\n'));
          $('.form-group').show();
          adjustTextareaHeight($('#fileLink')[0]);
        });
      });
    </script>    
</body>
</html>  
`, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
  return response;
}

async function handleUploadRequest() {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!file) throw new Error('缺少文件');
    if (file.size > 20 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: `文件大小超过${20 / (1024 * 1024)}MB限制` }), { status: 413, headers: { 'Content-Type': 'application/json' } });
    }

    const uploadFormData = new FormData();
    uploadFormData.append("chat_id", TG_CHAT_ID);
    let fileId;
    if (file.type.startsWith('image/gif')) {
      const newFileName = file.name.replace(/\.gif$/, '.jpeg');
      const newFile = new File([file], newFileName, { type: 'image/jpeg' });
      uploadFormData.append("document", newFile);
    } else {
      uploadFormData.append("document", file);
    }
    const telegramResponse = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendDocument`, { method: 'POST', body: uploadFormData });
    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      throw new Error(errorData.description || '上传到 Telegram 失败');
    }
    const responseData = await telegramResponse.json();
    if (responseData.result.video) fileId = responseData.result.video.file_id;
    else if (responseData.result.document) fileId = responseData.result.document.file_id;
    else if (responseData.result.sticker) fileId = responseData.result.sticker.file_id;
    else throw new Error('返回的数据中没有文件 ID');
    const imageURL = `https://${url.hostname}/get?file_id=${fileId}`;
    return new Response(JSON.stringify({ data: imageURL }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('内部服务器错误:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

async function handleGetFile() {
  let url = new URL(request.url);
  const fileId = url.searchParams.get('file_id');
  let filePath;
  let attempts = 0;
  const maxAttempts = 3;
  while (attempts < maxAttempts) {
    const getFilePath = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/getFile?file_id=${fileId}`);
    if (!getFilePath.ok) {
      return new Response('getFile请求失败', { status: 500 });
    }
    const fileData = await getFilePath.json();
    if (fileData.ok && fileData.result.file_path) {
      filePath = fileData.result.file_path;
      break;
    }
    attempts++;
  }

  const getFileResponse = `https://api.telegram.org/file/bot${TG_BOT_TOKEN}/${filePath}`;

  const response = await fetch(getFileResponse);
  if (!response.ok) {
    return new Response('获取文件内容失败', { status: 500 });
  }
  const fileExtension = filePath.split('.').pop().toLowerCase();
  let contentType = 'text/plain';
  if (fileExtension === 'jpg' || fileExtension === 'jpeg') contentType = 'image/jpeg';
  else if (fileExtension === 'png') contentType = 'image/png';
  else if (fileExtension === 'gif') contentType = 'image/gif';
  else if (fileExtension === 'webp') contentType = 'image/webp';
  else if (fileExtension === 'mp3') contentType = 'audio/mpeg';
  else if (fileExtension === 'mp4') contentType = 'video/mp4';
  else if (fileExtension === 'pdf') contentType = 'application/pdf';

  else contentType = 'application/octet-stream';
  const headers = new Headers(response.headers);
  headers.set('Content-Type', contentType);
  headers.set('Content-Disposition', 'inline');
  const responseToCache = new Response(response.body, { status: response.status, headers });
  return responseToCache;
}

async function handleBingImagesRequest() {
  const cacheKey = new Request('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=5');
  const res = await fetch(cacheKey);
  if (!res.ok) {
    return new Response('请求 Bing API 失败', { status: res.status });
  }
  const bingData = await res.json();
  const images = bingData.images.map(image => ({ url: `https://cn.bing.com${image.url}` }));
  const returnData = { status: true, message: "操作成功", data: images };
  const response = new Response(JSON.stringify(returnData), { status: 200, headers: { 'Content-Type': 'application/json' } });
  return response;
}
