# GoogleDrive-OnlyView-PDFDownloader
Convert Google Drive PDFs with view-only access into a high-quality downloadable PDF. The script captures each page as a full-resolution snapshot, ensuring every page is fully loaded before processing. Preserves original size, sharpness, and compiles all pages into one HQ PDF directly in your browser.



## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. The website will load with all functionality ready

### File Structure
```
DrivetoExportPDF/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 📋 How to Use the PDF Downloader

### Step-by-Step Instructions

1. **Open Google Drive File**
   - Navigate to your view-only Google Drive document in the browser
   - Make sure the document is fully loaded and visible

2. **Open Browser Console**
   - Right-click anywhere on the page → Select "Inspect" (or press F12)
   - Click on the "Console" tab in the developer tools

3. **Copy and Paste the Script**
   - Copy the JavaScript code from our website's code section
   - Paste it into the browser console
   - Press Enter to execute

4. **Wait for Processing**
   - The script will automatically scan for images
   - A progress indicator will show the conversion process
   - Wait for all pages to be processed

5. **Download PDF**
   - The PDF will automatically download when complete
   - Check your downloads folder for the generated file

### The PDF Downloader Script

Here's the complete JavaScript code that you can copy and paste into your browser console:

```javascript
(async function () {
    // Modern console styling
    const styles = {
      header: 'background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold; font-size: 16px;',
      success: 'background: linear-gradient(90deg, #56ab2f 0%, #a8e6cf 100%); color: #2d5016; padding: 6px 12px; border-radius: 4px; font-weight: bold;',
      error: 'background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%); color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold;',
      info: 'background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%); color: #1a365d; padding: 6px 12px; border-radius: 4px; font-weight: bold;',
      warning: 'background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%); color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold;',
      process: 'background: linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%); color: #8b4513; padding: 6px 12px; border-radius: 4px; font-weight: bold;',
      dim: 'color: #888; font-style: italic;',
      highlight: 'background: #ffeb3b; color: #333; padding: 2px 6px; border-radius: 2px; font-weight: bold;'
    };
  
    console.log('%c🚀 PDF Generator v3.0 - High Quality Mode', styles.header);
    console.group('📊 High-Quality PDF Generation Process');
  
    // Create modern progress indicator
    const progressContainer = document.createElement('div');
    progressContainer.id = 'pdf-progress';
    progressContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      padding: 20px 24px;
      border-radius: 16px;
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      z-index: 10000;
      min-width: 320px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1);
      animation: slideInRight 0.4s ease-out;
    `;
  
    // Add animation keyframes
    if (!document.querySelector('#pdf-animations')) {
      const style = document.createElement('style');
      style.id = 'pdf-animations';
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .pdf-progress-pulse {
          animation: pulse 2s infinite;
        }
      `;
      document.head.appendChild(style);
    }
  
    document.body.appendChild(progressContainer);
  
    const updateProgress = (message, percent = null, status = 'info') => {
      // Clear existing content safely
      progressContainer.textContent = '';
      progressContainer.className = status === 'processing' ? 'pdf-progress-pulse' : '';
  
      // Status icon
      const statusIcons = {
        loading: '⏳',
        success: '✅',
        error: '❌',
        processing: '🔄',
        info: 'ℹ️',
        warning: '⚠️'
      };
  
      // Create header with icon and message
      const headerDiv = document.createElement('div');
      headerDiv.style.cssText = 'display: flex; align-items: center; margin-bottom: 12px; font-weight: 600;';
  
      const iconSpan = document.createElement('span');
      iconSpan.style.cssText = 'margin-right: 10px; font-size: 18px;';
      iconSpan.textContent = statusIcons[status] || statusIcons.info;
  
      const messageSpan = document.createElement('span');
      messageSpan.textContent = message;
  
      if (percent !== null) {
        const percentSpan = document.createElement('span');
        percentSpan.style.cssText = 'margin-left: auto; font-weight: 700; color: #4CAF50;';
        percentSpan.textContent = `${percent}%`;
        headerDiv.appendChild(iconSpan);
        headerDiv.appendChild(messageSpan);
        headerDiv.appendChild(percentSpan);
      } else {
        headerDiv.appendChild(iconSpan);
        headerDiv.appendChild(messageSpan);
      }
  
      progressContainer.appendChild(headerDiv);
  
      // Add modern progress bar if percentage provided
      if (percent !== null) {
        const progressTrack = document.createElement('div');
        progressTrack.style.cssText = `
          background: rgba(255,255,255,0.2);
          height: 8px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          margin-top: 8px;
        `;
  
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
          background: linear-gradient(90deg, #4CAF50, #45a049);
          height: 100%;
          width: ${percent}%;
          border-radius: 12px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
        `;
  
        // Add shine effect
        const shine = document.createElement('div');
        shine.style.cssText = `
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shine 2s infinite;
        `;
  
        // Add shine animation
        if (!document.querySelector('#shine-animation')) {
          const shineStyle = document.createElement('style');
          shineStyle.id = 'shine-animation';
          shineStyle.textContent = `
            @keyframes shine {
              0% { left: -100%; }
              100% { left: 100%; }
            }
          `;
          document.head.appendChild(shineStyle);
        }
  
        progressBar.appendChild(shine);
        progressTrack.appendChild(progressBar);
        progressContainer.appendChild(progressTrack);
      }
    };
  
    // High-quality image processing function
    const processImageWithHighQuality = async (img) => {
      return new Promise((resolve) => {
        // Create high-resolution canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        // Get original dimensions
        const originalWidth = img.naturalWidth || img.width;
        const originalHeight = img.naturalHeight || img.height;
  
        // Set high DPI scaling for better quality
        const scaleFactor = Math.min(4, Math.max(1, 3000 / Math.max(originalWidth, originalHeight)));
  
        canvas.width = originalWidth * scaleFactor;
        canvas.height = originalHeight * scaleFactor;
  
        // Configure canvas for high quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.scale(scaleFactor, scaleFactor);
  
        // Draw image with antialiasing
        ctx.drawImage(img, 0, 0, originalWidth, originalHeight);
  
        // Convert to high-quality PNG (lossless) for maximum fidelity
        const imgData = canvas.toDataURL("image/png", 1.0);
  
        resolve({
          data: imgData,
          width: originalWidth,
          height: originalHeight,
          scaledWidth: canvas.width,
          scaledHeight: canvas.height
        });
      });
    };
  
    try {
      // Load jsPDF with promise
      const loadJsPDF = () => {
        return new Promise((resolve, reject) => {
          if (window.jspdf) {
            resolve(window.jspdf);
            return;
          }
  
          const script = document.createElement("script");
          script.onload = () => resolve(window.jspdf);
          script.onerror = reject;
  
          const scriptURL = "https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js";
  
          // Handle Trusted Types properly
          try {
            if (window.trustedTypes && window.trustedTypes.createPolicy) {
              const policy = trustedTypes.createPolicy("pdfScriptPolicy", {
                createScriptURL: (input) => input
              });
              script.src = policy.createScriptURL(scriptURL);
            } else {
              script.src = scriptURL;
            }
          } catch (e) {
            // Fallback if Trusted Types fails
            script.src = scriptURL;
          }
  
          document.body.appendChild(script);
        });
      };
  
      updateProgress("Loading jsPDF library...", null, 'loading');
      const { jsPDF } = await loadJsPDF();
  
      updateProgress("Scanning for images...", null, 'processing');
      const blobPrefix = "blob:https://drive.google.com/";
      const validImgs = Array.from(document.getElementsByTagName("img"))
        .filter(img => img.src.startsWith(blobPrefix) && img.complete);
  
      console.log(`📄 Found ${validImgs.length} valid images`);
  
      if (validImgs.length === 0) {
        updateProgress("❌ No valid images found", null, 'error');
        setTimeout(() => {
          if (progressContainer.parentNode) {
            document.body.removeChild(progressContainer);
          }
        }, 3000);
        return;
      }
  
      // Wait for all images to load completely
      updateProgress("Ensuring all images are loaded...", null, 'processing');
      await Promise.all(validImgs.map(img => {
        return new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
          } else {
            const handleLoad = () => {
              img.removeEventListener('load', handleLoad);
              img.removeEventListener('error', handleLoad);
              resolve();
            };
            img.addEventListener('load', handleLoad);
            img.addEventListener('error', handleLoad);
          }
        });
      }));
  
      updateProgress("Analyzing image dimensions...", null, 'processing');
  
      // Analyze first image to determine optimal PDF format
      const firstImg = validImgs[0];
      const firstImgAspect = (firstImg.naturalWidth || firstImg.width) / (firstImg.naturalHeight || firstImg.height);
  
      // Determine orientation based on first image
      const isLandscape = firstImgAspect > 1.2;
      const pdfOrientation = isLandscape ? "landscape" : "portrait";
  
      console.log(`📐 PDF orientation: ${pdfOrientation} (aspect ratio: ${firstImgAspect.toFixed(2)})`);
  
      // Create PDF with optimal settings for high quality
      const pdf = new jsPDF({
        orientation: pdfOrientation.charAt(0),
        unit: "pt", // Use points for precise control
        format: "a4",
        compress: false, // Disable compression to maintain quality
        precision: 16 // Higher precision for better quality
      });
  
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      console.log(`📄 PDF page size: ${pageWidth}x${pageHeight} pts`);
  
      // Process images one by one with high quality processing
      for (let index = 0; index < validImgs.length; index++) {
        const img = validImgs[index];
        const progress = Math.floor(((index + 1) / validImgs.length) * 85); // Reserve 15% for final processing
  
        updateProgress(`Processing page ${index + 1} of ${validImgs.length}`, progress, 'processing');
  
        try {
          // Process image with high quality
          const processedImg = await processImageWithHighQuality(img);
  
          // Calculate scaling to fit page while maintaining exact aspect ratio
          const imgWidth = processedImg.width;
          const imgHeight = processedImg.height;
          const imgAspectRatio = imgWidth / imgHeight;
          const pageAspectRatio = pageWidth / pageHeight;
  
          let finalWidth, finalHeight;
  
          // Scale to fit page dimensions exactly
          if (imgAspectRatio > pageAspectRatio) {
            // Image is wider than page ratio - fit to width
            finalWidth = pageWidth;
            finalHeight = pageWidth / imgAspectRatio;
          } else {
            // Image is taller than page ratio - fit to height  
            finalHeight = pageHeight;
            finalWidth = pageHeight * imgAspectRatio;
          }
  
          // Center the image on the page
          const x = (pageWidth - finalWidth) / 2;
          const y = (pageHeight - finalHeight) / 2;
  
          // Add new page for subsequent images
          if (index > 0) {
            pdf.addPage();
          }
  
          // Add image to PDF with high quality settings
          pdf.addImage(
            processedImg.data,
            "PNG", // Use PNG for lossless quality
            x,
            y,
            finalWidth,
            finalHeight,
            `img_${index}`,
            "SLOW" // Use SLOW compression for better quality
          );
  
          console.log(`✅ Page ${index + 1}/${validImgs.length} processed - Original: ${imgWidth}x${imgHeight}, PDF: ${finalWidth.toFixed(1)}x${finalHeight.toFixed(1)} pts`);
  
          // Small delay to prevent UI blocking
          await new Promise(resolve => setTimeout(resolve, 50));
  
        } catch (error) {
          console.error(`❌ Error processing image ${index + 1}:`, error);
          // Continue with next image even if one fails
        }
      }
  
      // Generate filename
      updateProgress("Generating filename...", 90, 'processing');
      let filename = document.querySelector('meta[itemprop="name"]')?.content
        || document.querySelector('title')?.textContent
        || `high_quality_document_${new Date().toISOString().split('T')[0]}`;
  
      // Clean filename and ensure .pdf extension
      filename = filename.replace(/[^\w\s-]/g, '').trim().substring(0, 100); // Limit length
      if (!filename.toLowerCase().endsWith(".pdf")) {
        filename += ".pdf";
      }
  
      updateProgress("Generating high-quality PDF...", 95, 'processing');
      console.log("💾 Saving high-quality PDF...");
  
      // Save PDF with high quality settings
      const pdfOutput = pdf.output('blob');
      const url = URL.createObjectURL(pdfOutput);
  
      // Create download link
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
  
      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 1000);
  
      updateProgress("✅ High-quality PDF downloaded!", 100, 'success');
      console.log(`🎉 High-quality PDF "${filename}" downloaded successfully!`);
      console.log(`📊 File contains ${validImgs.length} pages at maximum quality`);
  
      // Remove progress indicator after success
      setTimeout(() => {
        if (progressContainer.parentNode) {
          progressContainer.style.animation = 'slideOutRight 0.4s ease-in';
          setTimeout(() => {
            if (progressContainer.parentNode) {
              document.body.removeChild(progressContainer);
            }
          }, 400);
        }
      }, 3000);
  
    } catch (error) {
      console.error("❌ PDF generation failed:", error);
      updateProgress("❌ PDF generation failed", null, 'error');
  
      setTimeout(() => {
        if (progressContainer.parentNode) {
          progressContainer.style.animation = 'slideOutRight 0.4s ease-in';
          setTimeout(() => {
            if (progressContainer.parentNode) {
              document.body.removeChild(progressContainer);
            }
          }, 400);
        }
      }, 5000);
    } finally {
      console.groupEnd();
    }
  })();
```

### What the Script Does

1. **Scans for Images**: Automatically detects all images in the Google Drive document
2. **High-Quality Processing**: Uses advanced canvas techniques to maintain image quality
3. **Smart PDF Generation**: Creates a PDF with optimal page orientation and sizing
4. **Progress Tracking**: Shows real-time progress with a beautiful UI overlay
5. **Automatic Download**: Downloads the generated PDF with a descriptive filename

### Requirements

- **Browser**: Modern browser with JavaScript enabled
- **Libraries**: The script automatically loads jsPDF library from CDN
- **Permissions**: Allow popups/downloads for the site

### Troubleshooting

- **No Images Found**: Ensure the document is fully loaded and visible
- **Script Errors**: Check browser console for error messages
- **Download Issues**: Ensure popup blockers are disabled
- **Quality Issues**: The script automatically optimizes for best quality

```javascript
(async function () {
    // Modern console styling
    const styles = {
      header: 'background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold; font-size: 16px;',
      success: 'background: linear-gradient(90deg, #56ab2f 0%, #a8e6cf 100%); color: #2d5016; padding: 6px 12px; border-radius: 4px; font-weight: bold;',
      error: 'background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%); color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold;',
      info: 'background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%); color: #1a365d; padding: 6px 12px; border-radius: 4px; font-weight: bold;',
      warning: 'background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%); color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold;',
      process: 'background: linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%); color: #8b4513; padding: 6px 12px; border-radius: 4px; font-weight: bold;',
      dim: 'color: #888; font-style: italic;',
      highlight: 'background: #ffeb3b; color: #333; padding: 2px 6px; border-radius: 2px; font-weight: bold;'
    };
  
    console.log('%c🚀 PDF Generator v3.0 - High Quality Mode', styles.header);
    console.group('📊 High-Quality PDF Generation Process');
  
    // Create modern progress indicator
    const progressContainer = document.createElement('div');
    progressContainer.id = 'pdf-progress';
    progressContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      padding: 20px 24px;
      border-radius: 16px;
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      z-index: 10000;
      min-width: 320px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1);
      animation: slideInRight 0.4s ease-out;
    `;
  
    // Add animation keyframes
    if (!document.querySelector('#pdf-animations')) {
      const style = document.createElement('style');
      style.id = 'pdf-animations';
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .pdf-progress-pulse {
          animation: pulse 2s infinite;
        }
      `;
      document.head.appendChild(style);
    }
  
    document.body.appendChild(progressContainer);
  
    const updateProgress = (message, percent = null, status = 'info') => {
      // Clear existing content safely
      progressContainer.textContent = '';
      progressContainer.className = status === 'processing' ? 'pdf-progress-pulse' : '';
  
      // Status icon
      const statusIcons = {
        loading: '⏳',
        success: '✅',
        error: '❌',
        processing: '🔄',
        info: 'ℹ️',
        warning: '⚠️'
      };
  
      // Create header with icon and message
      const headerDiv = document.createElement('div');
      headerDiv.style.cssText = 'display: flex; align-items: center; margin-bottom: 12px; font-weight: 600;';
  
      const iconSpan = document.createElement('span');
      iconSpan.style.cssText = 'margin-right: 10px; font-size: 18px;';
      iconSpan.textContent = statusIcons[status] || statusIcons.info;
  
      const messageSpan = document.createElement('span');
      messageSpan.textContent = message;
  
      if (percent !== null) {
        const percentSpan = document.createElement('span');
        percentSpan.style.cssText = 'margin-left: auto; font-weight: 700; color: #4CAF50;';
        percentSpan.textContent = `${percent}%`;
        headerDiv.appendChild(iconSpan);
        headerDiv.appendChild(messageSpan);
        headerDiv.appendChild(percentSpan);
      } else {
        headerDiv.appendChild(iconSpan);
        headerDiv.appendChild(messageSpan);
      }
  
      progressContainer.appendChild(headerDiv);
  
      // Add modern progress bar if percentage provided
      if (percent !== null) {
        const progressTrack = document.createElement('div');
        progressTrack.style.cssText = `
          background: rgba(255,255,255,0.2);
          height: 8px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          margin-top: 8px;
        `;
  
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
          background: linear-gradient(90deg, #4CAF50, #45a049);
          height: 100%;
          width: ${percent}%;
          border-radius: 12px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
        `;
  
        // Add shine effect
        const shine = document.createElement('div');
        shine.style.cssText = `
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shine 2s infinite;
        `;
  
        // Add shine animation
        if (!document.querySelector('#shine-animation')) {
          const shineStyle = document.createElement('style');
          shineStyle.id = 'shine-animation';
          shineStyle.textContent = `
            @keyframes shine {
              0% { left: -100%; }
              100% { left: 100%; }
            }
          `;
          document.head.appendChild(shineStyle);
        }
  
        progressBar.appendChild(shine);
        progressTrack.appendChild(progressBar);
        progressContainer.appendChild(progressTrack);
      }
    };
  
    // High-quality image processing function
    const processImageWithHighQuality = async (img) => {
      return new Promise((resolve) => {
        // Create high-resolution canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        // Get original dimensions
        const originalWidth = img.naturalWidth || img.width;
        const originalHeight = img.naturalHeight || img.height;
  
        // Set high DPI scaling for better quality
        const scaleFactor = Math.min(4, Math.max(1, 3000 / Math.max(originalWidth, originalHeight)));
  
        canvas.width = originalWidth * scaleFactor;
        canvas.height = originalHeight * scaleFactor;
  
        // Configure canvas for high quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.scale(scaleFactor, scaleFactor);
  
        // Draw image with antialiasing
        ctx.drawImage(img, 0, 0, originalWidth, originalHeight);
  
        // Convert to high-quality PNG (lossless) for maximum fidelity
        const imgData = canvas.toDataURL("image/png", 1.0);
  
        resolve({
          data: imgData,
          width: originalWidth,
          height: originalHeight,
          scaledWidth: canvas.width,
          scaledHeight: canvas.height
        });
      });
    };
  
    try {
      // Load jsPDF with promise
      const loadJsPDF = () => {
        return new Promise((resolve, reject) => {
          if (window.jspdf) {
            resolve(window.jspdf);
            return;
          }
  
          const script = document.createElement("script");
          script.onload = () => resolve(window.jspdf);
          script.onerror = reject;
  
          const scriptURL = "https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js";
  
          // Handle Trusted Types properly
          try {
            if (window.trustedTypes && window.trustedTypes.createPolicy) {
              const policy = trustedTypes.createPolicy("pdfScriptPolicy", {
                createScriptURL: (input) => input
              });
              script.src = policy.createScriptURL(scriptURL);
            } else {
              script.src = scriptURL;
            }
          } catch (e) {
            // Fallback if Trusted Types fails
            script.src = scriptURL;
          }
  
          document.body.appendChild(script);
        });
      };
  
      updateProgress("Loading jsPDF library...", null, 'loading');
      const { jsPDF } = await loadJsPDF();
  
      updateProgress("Scanning for images...", null, 'processing');
      const blobPrefix = "blob:https://drive.google.com/";
      const validImgs = Array.from(document.getElementsByTagName("img"))
        .filter(img => img.src.startsWith(blobPrefix) && img.complete);
  
      console.log(`📄 Found ${validImgs.length} valid images`);
  
      if (validImgs.length === 0) {
        updateProgress("❌ No valid images found", null, 'error');
        setTimeout(() => {
          if (progressContainer.parentNode) {
            document.body.removeChild(progressContainer);
          }
        }, 3000);
        return;
      }
  
      // Wait for all images to load completely
      updateProgress("Ensuring all images are loaded...", null, 'processing');
      await Promise.all(validImgs.map(img => {
        return new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
          } else {
            const handleLoad = () => {
              img.removeEventListener('load', handleLoad);
              img.removeEventListener('error', handleLoad);
              resolve();
            };
            img.addEventListener('load', handleLoad);
            img.addEventListener('error', handleLoad);
          }
        });
      }));
  
      updateProgress("Analyzing image dimensions...", null, 'processing');
  
      // Analyze first image to determine optimal PDF format
      const firstImg = validImgs[0];
      const firstImgAspect = (firstImg.naturalWidth || firstImg.width) / (firstImg.naturalHeight || firstImg.height);
  
      // Determine orientation based on first image
      const isLandscape = firstImgAspect > 1.2;
      const pdfOrientation = isLandscape ? "landscape" : "portrait";
  
      console.log(`📐 PDF orientation: ${pdfOrientation} (aspect ratio: ${firstImgAspect.toFixed(2)})`);
  
      // Create PDF with optimal settings for high quality
      const pdf = new jsPDF({
        orientation: pdfOrientation.charAt(0),
        unit: "pt", // Use points for precise control
        format: "a4",
        compress: false, // Disable compression to maintain quality
        precision: 16 // Higher precision for better quality
      });
  
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      console.log(`📄 PDF page size: ${pageWidth}x${pageHeight} pts`);
  
      // Process images one by one with high quality processing
      for (let index = 0; index < validImgs.length; index++) {
        const img = validImgs[index];
        const progress = Math.floor(((index + 1) / validImgs.length) * 85); // Reserve 15% for final processing
  
        updateProgress(`Processing page ${index + 1} of ${validImgs.length}`, progress, 'processing');
  
        try {
          // Process image with high quality
          const processedImg = await processImageWithHighQuality(img);
  
          // Calculate scaling to fit page while maintaining exact aspect ratio
          const imgWidth = processedImg.width;
          const imgHeight = processedImg.height;
          const imgAspectRatio = imgWidth / imgHeight;
          const pageAspectRatio = pageWidth / pageHeight;
  
          let finalWidth, finalHeight;
  
          // Scale to fit page dimensions exactly
          if (imgAspectRatio > pageAspectRatio) {
            // Image is wider than page ratio - fit to width
            finalWidth = pageWidth;
            finalHeight = pageWidth / imgAspectRatio;
          } else {
            // Image is taller than page ratio - fit to height  
            finalHeight = pageHeight;
            finalWidth = pageHeight * imgAspectRatio;
          }
  
          // Center the image on the page
          const x = (pageWidth - finalWidth) / 2;
          const y = (pageHeight - finalHeight) / 2;
  
          // Add new page for subsequent images
          if (index > 0) {
            pdf.addPage();
          }
  
          // Add image to PDF with high quality settings
          pdf.addImage(
            processedImg.data,
            "PNG", // Use PNG for lossless quality
            x,
            y,
            finalWidth,
            finalHeight,
            `img_${index}`,
            "SLOW" // Use SLOW compression for better quality
          );
  
          console.log(`✅ Page ${index + 1}/${validImgs.length} processed - Original: ${imgWidth}x${imgHeight}, PDF: ${finalWidth.toFixed(1)}x${finalHeight.toFixed(1)} pts`);
  
          // Small delay to prevent UI blocking
          await new Promise(resolve => setTimeout(resolve, 50));
  
        } catch (error) {
          console.error(`❌ Error processing image ${index + 1}:`, error);
          // Continue with next image even if one fails
        }
      }
  
      // Generate filename
      updateProgress("Generating filename...", 90, 'processing');
      let filename = document.querySelector('meta[itemprop="name"]')?.content
        || document.querySelector('title')?.textContent
        || `high_quality_document_${new Date().toISOString().split('T')[0]}`;
  
      // Clean filename and ensure .pdf extension
      filename = filename.replace(/[^\w\s-]/g, '').trim().substring(0, 100); // Limit length
      if (!filename.toLowerCase().endsWith(".pdf")) {
        filename += ".pdf";
      }
  
      updateProgress("Generating high-quality PDF...", 95, 'processing');
      console.log("💾 Saving high-quality PDF...");
  
      // Save PDF with high quality settings
      const pdfOutput = pdf.output('blob');
      const url = URL.createObjectURL(pdfOutput);
  
      // Create download link
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
  
      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 1000);
  
      updateProgress("✅ High-quality PDF downloaded!", 100, 'success');
      console.log(`🎉 High-quality PDF "${filename}" downloaded successfully!`);
      console.log(`📊 File contains ${validImgs.length} pages at maximum quality`);
  
      // Remove progress indicator after success
      setTimeout(() => {
        if (progressContainer.parentNode) {
          progressContainer.style.animation = 'slideOutRight 0.4s ease-in';
          setTimeout(() => {
            if (progressContainer.parentNode) {
              document.body.removeChild(progressContainer);
            }
          }, 400);
        }
      }, 3000);
  
    } catch (error) {
      console.error("❌ PDF generation failed:", error);
      updateProgress("❌ PDF generation failed", null, 'error');
  
      setTimeout(() => {
        if (progressContainer.parentNode) {
          progressContainer.style.animation = 'slideOutRight 0.4s ease-in';
          setTimeout(() => {
            if (progressContainer.parentNode) {
              document.body.removeChild(progressContainer);
            }
          }, 400);
        }
      }, 5000);
    } finally {
      console.groupEnd();
    }
  })();
```

### What the Script Does

1. **Scans for Images**: Automatically detects all images in the Google Drive document
2. **High-Quality Processing**: Uses advanced canvas techniques to maintain image quality
3. **Smart PDF Generation**: Creates a PDF with optimal page orientation and sizing
4. **Progress Tracking**: Shows real-time progress with a beautiful UI overlay
5. **Automatic Download**: Downloads the generated PDF with a descriptive filename

### Requirements

- **Browser**: Modern browser with JavaScript enabled
- **Libraries**: The script automatically loads jsPDF library from CDN
- **Permissions**: Allow popups/downloads for the site

### Troubleshooting

- **No Images Found**: Ensure the document is fully loaded and visible
- **Script Errors**: Check browser console for error messages
- **Download Issues**: Ensure popup blockers are disabled
- **Quality Issues**: The script automatically optimizes for best quality

## 🎨 Customization

### Colors
The website uses a modern high-tech color palette with CSS custom properties (variables) for easy customization:

**Color Palette:**
- **Cyber Mint (#3FFFA8)**: Primary color - soft neon mint for futuristic appeal
- **Electric Cyan (#00E1FF)**: Secondary color - refined tech glow
- **Deep Space Black (#0A0B0D)**: Main background - ultra-dark for perfect contrast
- **Midnight Slate (#1B1E24)**: Card backgrounds - adds depth without harshness
- **Mist White (#E6F1F4)**: Primary text - crisp readability
- **Steel Gray (#A3B3BF)**: Secondary text - subtle for less important content
- **Magenta Glow (#FF4DFF)**: Accent color - vibrant pop to break monotony
- **Gradient**: Smooth transition from Cyber Mint to Electric Cyan

```css
:root {
    --primary-color: #3FFFA8;    /* Cyber Mint - Main color */
    --secondary-color: #00E1FF;  /* Electric Cyan */
    --accent-color: #FF4DFF;     /* Magenta Glow */
    --bg-dark: #0A0B0D;          /* Deep Space Black */
    --bg-card: #1B1E24;          /* Midnight Slate */
    --text-primary: #E6F1F4;     /* Mist White */
    --text-secondary: #A3B3BF;   /* Steel Gray */
    --gradient-primary: linear-gradient(135deg, #3FFFA8, #00E1FF);
}
```

### Content
- Update the project title and description in `index.html`
- Modify the JavaScript code in the code section
- Replace the demo placeholder with your actual demo content
- Update the disclaimer and footer information

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔧 Technical Details

### CSS Features
- CSS Grid and Flexbox for layouts
- CSS Custom Properties (variables)
- CSS Animations and Transitions
- Backdrop Filter (backdrop-filter)
- CSS Gradients
- Media Queries for responsiveness

### JavaScript Features
- Intersection Observer API for scroll animations
- Event delegation and throttling
- Copy to clipboard implementation
- Smooth scrolling

### Browser Support
- **Modern Browsers**: Full support (Chrome 60+, Firefox 55+, Safari 12+)
- **Older Browsers**: Basic functionality with graceful degradation

## 🎯 Usage

### Navigation
- Use the "Learn More" button to scroll to the How It Works section
- Smooth scrolling between sections

### Code Copying
1. Click the "Copy to Clipboard" button in the code section
2. The code will be copied to your clipboard
3. A success notification will appear
4. Paste the code into your browser console when viewing a Google Drive PDF

### Mobile Experience
- Responsive design adapts to all screen sizes
- Touch-friendly buttons and navigation
- Optimized layouts for mobile devices

## 🚀 Performance Features

- **Lazy Loading**: Images and animations load as needed
- **Throttled Scroll Events**: Optimized scroll performance
- **CSS Animations**: Hardware-accelerated animations
- **Minimal Dependencies**: Only Font Awesome for icons (CDN)

## 🔒 Security & Privacy

- **Client-Side Only**: All functionality runs in the browser
- **No Data Collection**: No user data is sent to external servers
- **Educational Purpose**: Built for educational and personal use only

## 📄 License

This project is built for educational purposes. Please respect the copyright and privacy of documents you access using the PDF downloader script.

## 🤝 Contributing

Feel free to:
- Report bugs or issues
- Suggest new features
- Submit pull requests for improvements
- Share feedback on the design or functionality

## 📞 Support

For questions or support:
1. Check the "How It Works" section for usage instructions
2. Review the JavaScript code for technical details
3. Ensure you have the required libraries (html2canvas, jsPDF) when using the script

## 🎉 Acknowledgments

- Font Awesome for the beautiful icons
- Modern CSS and JavaScript APIs for enhanced functionality
- The open-source community for inspiration and best practices

---

**Note**: This website showcases a JavaScript tool for downloading PDFs from Google Drive view-only links. The tool is for educational purposes only. Always respect copyright and privacy when accessing documents.
