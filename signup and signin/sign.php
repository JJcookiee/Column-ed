<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Column-ed</title>
    <link rel="icon" type="image/x-icon" href="/Profile page/Column-ed.png"/>
    <link rel="stylesheet" href="/signup and signin/sign.css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  </head>
  <body>
    <header class="header">
      <a href="#home" class="logo">Column-ed</a>
      <form>
        <div class="searchbar">
          <span class="search-icon material-symbols-outlined">search</span>
          <input class="search-input" type="search" placeholder="Search for media...">
        </div>
      </form>
      </div>
      <div class="header-right">
        <a href="/index.html" class="material-symbols-outlined home-icon" aria-hidden="true" alt="Home">home</a>
        <a id="active" href="/Profile page/Profile.html" class="material-symbols-outlined profile-icon">account_circle</a>
        <a href="#notifications" class="material-symbols-outlined noti-icon">notifications</a>
        <a href="/Watchlist and favoutrites/Watchlist.html" class="material-symbols-outlined tv-icon">live_tv</a>
      </div>
    </header>

    <section class="profile-header">      
    </section>

    <section class="poster-section">
        <?php
        $sign = htmlspecialchars($_GET["sign"] ?? "in");
        if ($sign === "up") {
            include 'signup.php';
        } else {
            include 'signin.php';
        }
        ?>     
        <button onclick="topFunction() "class="anchor-button" id="anchor-button">
        <i data-lucide="arrow-up"></i>
    </button>

    </section>

    <script src="sign.js"></script>
    <script>
    lucide.createIcons();
    </script>
  </body>
</html>
