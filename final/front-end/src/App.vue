<template>
  <div id="app">
    <header id="header">
        <div class="home">
        <router-link to="/"><i class="fas fa-shopping-basket"></i></router-link>
        </div>
      <div class="title">
      <h1>NFT Bid Bazarre</h1>
      </div>
    <!--  <nav> -->
        <div class="user">
        <router-link to="/dashboard"><i class="fas fa-user-circle"></i></router-link>
        </div>
      <!--</nav> -->
    </header>
    <div class="view">
    <router-view />
    </div>
    <div class="footer">
    <a href="https://github.com/InInsanity7/cs260repo/tree/main/final">https://github.com/InInsanity7/cs260repo/tree/main/final</a>
    </div>
  </div>
</template>

<style>
/* Color scheme: https://paletton.com/#uid=7040u0knHs+edG7jrvYscpiuCk2 */
/* red: #e74c3c
 * blue: #277E8E

 dark: #1d3557;
 medium: #457b9d;
 light: #a8dadc;
 off-white: #f1faee;
 red: #e63946;
 */

html {
    background-color: #fafafa;
}

body {
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 13pt;
  margin: 0px 5%;
  color: #f1faee;
}

#header {
  font-family: 'Akaya Kanadaka', sans-serif;
  display: flex;
  margin: 0 1em 1em 0;
  height: 50px;
  width: 500px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  /* Fixed position */
  position: fixed;
  z-index: 10000;
  left: 50%;
  transform: translate(-50%, 0);
  /* Color and alignment */
  background: #1d3557;
  color: #f1faee;
  text-align: center;
  align-items: center;
  justify-content:center;
  box-shadow: 0 0 0 0.7em #457b9d;
}

.footer a {
    text-align:center;
    color:#457b9d;
    text-decoration: none;
}
.footer a:hover {
    color:#457b9d;
    text-decoration: none;
}
.footer {
    padding-bottom: 10px;
}

.footer, .view {
  text-align: center;
  padding-top: 70px;
  color: #1d3557;
}
.home {
    grid-column: 1;
    padding: 10px;
  color: #f1faee;
}
.user {
    grid-column: 3;
    padding: 10px;
  color: #f1faee;
}
.title {
    grid-column: 2;
}
/* nav { */
/*   display: border-box; */
/*   justify-content: center; */
/* } */

h1 {
  color: #fff;
  font-size: 45px;
  color: #f1faee;
}

h2 {
  font-size: 12px;
  color: #f1faee;
}

#header .fas {
  font-size: 25px;
  color: #fff;
  width: 50px;
  color: #f1faee;
}

.pure-button-primary {
  background-color: #7EBC89;
}
</style>
