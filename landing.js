document.addEventListener('DOMContentLoaded', function() {
    // Function to handle center selection
    window.selectCenter = function(centerName) {
      // Store the selected center in localStorage
      localStorage.setItem('selectedCenter', centerName);
      
      // Hide centers section and show success message
      document.getElementById('centersSection').innerHTML = `
        <div class="alert alert-success">
          <h4 class="alert-heading">Center Selected!</h4>
          <p>You have selected ${centerName} as your copy center.</p>
          <hr>
          <p class="mb-0">You can now proceed to upload your materials or select services.</p>
        </div>
        
        <div class="card mt-4">
          <h3>Upload Materials</h3>
          <div class="mb-3 mt-3">
            <label for="formFile" class="form-label">Select files to print</label>
            <input class="form-control" type="file" id="formFile" multiple>
          </div>
          
          <h4 class="mt-4">Printing Options</h4>
          <div class="row mt-3">
            <div class="col-md-6">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="colorPrinting">
                <label class="form-check-label" for="colorPrinting">
                  Color Printing
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="doubleSided">
                <label class="form-check-label" for="doubleSided">
                  Double-sided
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="stapled">
                <label class="form-check-label" for="stapled">
                  Stapled
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="holePunched">
                <label class="form-check-label" for="holePunched">
                  Hole Punched
                </label>
              </div>
            </div>
          </div>
          
          <div class="row mt-4">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="copies" class="form-label">Number of Copies</label>
                <input type="number" class="form-control" id="copies" min="1" value="1">
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="paperSize" class="form-label">Paper Size</label>
                <select class="form-select" id="paperSize">
                  <option value="a4">A4</option>
                  <option value="letter">Letter</option>
                  <option value="legal">Legal</option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="mt-4">
            <button class="btn btn-primary" onclick="submitPrintJob()">Submit Print Job</button>
            <button class="btn btn-outline-secondary ms-2" onclick="resetSelection()">Select Different Center</button>
          </div>
        </div>
      `;
    };
    
    // Function to handle print job submission
    window.submitPrintJob = function() {
      const selectedCenter = localStorage.getItem('selectedCenter');
      const fileInput = document.getElementById('formFile');
      
      if (fileInput.files.length === 0) {
        alert('Please select at least one file to print.');
        return;
      }
      
      document.getElementById('centersSection').innerHTML = `
        <div class="alert alert-success">
          <h4 class="alert-heading">Print Job Submitted!</h4>
          <p>Your print job has been successfully submitted to ${selectedCenter}.</p>
          <hr>
          <p class="mb-0">You will receive a notification when your materials are ready for pickup.</p>
        </div>
        
        <div class="text-center mt-4">
          <button class="btn btn-primary" onclick="window.location.href='../Teacher_Dashboard/index.html'">Return to Dashboard</button>
        </div>
      `;
    };
    
    // Function to reset center selection
    window.resetSelection = function() {
      localStorage.removeItem('selectedCenter');
      window.location.reload();
    };
    
    // Check if a center was previously selected
    const selectedCenter = localStorage.getItem('selectedCenter');
    if (selectedCenter) {
      selectCenter(selectedCenter);
    }
  });
  lucide.createIcons();

  // Theme handling
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Function to set theme
  function setTheme(theme) {
      if (theme === 'system') {
          document.documentElement.setAttribute('data-theme', prefersDarkScheme.matches ? 'dark' : 'light');
      } else {
          document.documentElement.setAttribute('data-theme', theme);
      }
      localStorage.setItem('theme', theme);
      themeToggle.setAttribute('data-theme', theme);
  }

  // Initialize theme
  const savedTheme = localStorage.getItem('theme') || 'system';
  setTheme(savedTheme);

  // Theme toggle click handler
  themeToggle.addEventListener('click', () => {
      const currentTheme = themeToggle.getAttribute('data-theme');
      const themes = ['dark', 'light', 'system'];
      const currentIndex = themes.indexOf(currentTheme);
      const nextIndex = (currentIndex + 1) % themes.length;
      setTheme(themes[nextIndex]);
  });

  // Listen for system theme changes
  prefersDarkScheme.addEventListener('change', (e) => {
      if (localStorage.getItem('theme') === 'system') {
          document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
  });