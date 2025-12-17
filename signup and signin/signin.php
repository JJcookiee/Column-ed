<div class="sign-container">
    <div class="sign-box">
        <h2>Sign In</h2>
        <form action="/signup and signin/login.php" method="post">
            <?php
            $up = "username";
            $pp = "password";
            ?>
            <div class="input-field">
                <span class="sign-inputs">Username</span>
                <?php if(isset($_GET['error']) && $_GET['error'] === 'user') { $up = 'No such user exists'; } ?>
                <input type="text" name="user" placeholder=<?=$up ?> required />
            </div>
            <div class="input-field">
                <span class="sign-inputs">Password</span>
                <?php if(isset($_GET['error']) && $_GET['error'] === 'password') { $pp = 'Incorrect password'; } ?>
                <input type="password" name="password" placeholder=<?=$pp ?> required />
            </div>
            <button type="submit" class="btn">Sign In</button>
        </form>
    </div>
</div>