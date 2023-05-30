<div class="sidebar">
    <ul>
      <li><a href="#">Link 1</a></li>
      <li><a href="#">Link 2</a></li>
      <li><a href="#">Link 3</a></li>
    </ul>
  </div>
  
  <style>
  .sidebar {
    position: fixed;
    top: 66px;
    right: 0;
    width: 200px;
    height: 100%;
    overflow-x: hidden;
    padding-top: 20px;
    border-right: 1px solid black;
    border-left: 1px solid black;
  }
  
  .sidebar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  .sidebar li a {
    display: block;
    color: #000;
    padding: 8px 16px;
    text-decoration: none;
  }
  
  .sidebar li a:hover {
    background-color: #555;
    color: white;
  }
  </style>