<div>
  <h2>&#128640; Getting Started</h2>
  <p>To get a local copy of this project up and running on your system, follow these steps.</p>

  <h3>Prerequisites</h3>
  <p>Ensure you have the following installed on your local machine:</p>
  <ul>
    <li><a href="https://nodejs.org/" target="_blank">Node.js</a> (v14.0.0 or higher recommended)</li>
    <li><a href="https://www.mongodb.com/" target="_blank">MongoDB</a> (Local or Atlas URI)</li>
  </ul>

  <h3>Running the Application Locally</h3>
  <p>This is a full-stack application. You will need to open <strong>two separate terminal windows</strong> to run the frontend client and the backend server simultaneously.</p>

  <h4>1. Initialize the Backend</h4>
  <p>Open your first terminal window, navigate to the backend directory, and start the Node.js server:</p>
  <pre><code>cd backend
npm install
node --watch server.js</code></pre>

  <h4>2. Initialize the Frontend</h4>
  <p>Open a second terminal window, navigate to the frontend directory, and start the React development server:</p>
  <pre><code>cd frontend
npm install
npm run dev</code></pre>

  <p>Once both servers are running, the application will be accessible via your localhost address.</p>
</div>
