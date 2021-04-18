<template>
<div id="app">
  <div id="menu">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img src="/ordinary.png">
      </div>
        <h1>Bid Bazarre</h1>
    </router-link>
  </div>
  <div id="side">
    <router-link to="/admin">
        <div class="menu-item build">
            <p>Build your stand</p>
        </div>
    </router-link>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <p>GitHub: </p> 
    <a href="#">INSERT-GITHUB-HERE</a>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #5BDEFF;
  color: #1C454F;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
