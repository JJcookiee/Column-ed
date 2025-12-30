<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <?php require 'host.php'?>
    <?php require 'userinfo.php'?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Column-ed</title>
    <link rel="icon" type="image/x-icon" href="Column-ed.png"/>
    <link rel="stylesheet" href="Profile.css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
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
        <a href="index.html" class="material-symbols-outlined home-icon" aria-hidden="true" alt="Home">home</a>
        <a id="active" href="sign.php?sign=in" class="material-symbols-outlined profile-icon">account_circle</a>
        <a href="sign.php?sign=up" class="material-symbols-outlined noti-icon">notifications</a>
        <a href="Watchlist.html" class="material-symbols-outlined tv-icon">live_tv</a>
      </div>
    </header>

    <section class="profile-header">
      <div class="avatar">
        <?php
        echo "<img src='$pfp' alt='Avatar' />";
        ?>
      </div>
      <div class="profile-info">
        <?php
          echo "<h1>$displayname</h1>";
          echo "<p class='username'>@$username</p>";
          echo "<p class='bio'>$bio</p>";  
        ?>
      </div>
    </section>

    <?php
    echo "<section class='stats'>
      <div class='stat'>
        <span class='num'>$dresult</span>
        <a href='#films' class='label'>Diary</a>
      </div>
      <div class='stat'>
        <span class='num'>$revresult</span>
        <a href='#reviews' class='label'>Reviews</a>
      </div>
      <div class='stat'>
        <span class='num'>$favresult</span>
        <a href='watchlist.html' class='label'>Favoutrites</a>
      </div>
    </section>";
    ?>

    <section class="poster-section">
      <div class="rectangle-row" id="rectangles"></div>

      <script src="tmdbAPI.js"></script>

      <div class="vertical-separator"></div>
      <div class="info-section">
      <h2>Featured stuff?</h2>

      <div class="follow-container">
        <div class="followers">
          <span class="num">401</span>
          <a href="#followers" class="label">Followers</a>
        </div>

        <div class="followers">
          <span class="num">224</span>
          <a href="#following" class="label">Following</a>
        </div>
      </div>
    </div>

    <button onclick="topFunction() "class="anchor-button" id="anchor-button">
    <i data-lucide="arrow-up"></i>
    </button>

    </section>

    <script src="Profile.js"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script>
    lucide.createIcons();
    </script>
  </body>
</html>
