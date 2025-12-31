<div class="sign-container">
    <div class="sign-box">
        <h2>Sign Up</h2>
        <form action="newuser.php" method="post">
            <?php
            $up = "username";
            $pp = "password";
            ?>
            <div class="input-field">
                <span class="sign-inputs">Username</span>
                <?php if(isset($_GET['error']) && $_GET['error'] === 'user') { $up = 'User already exists'; } ?>
                <input type="text" name="user" placeholder=<?=$up ?> required />
            </div>
            <div class="input-field">
                <span class="sign-inputs">Display name</span>
                <input type="text" name="repeat" placeholder="display name" required />
            </div>
            <div class="input-field">
                <span class="sign-inputs">Password</span>
                <?php if(isset($_GET['error']) && $_GET['error'] === 'password') { $pp = 'Password not repeated'; } ?>
                <input type="password" name="password" placeholder=<?=$pp ?> required />
            </div>
            <div class="input-field">
                <span class="sign-inputs">Repeat password</span>
                <?php if(isset($_GET['error']) && $_GET['error'] === 'password') { $pp = 'Password not repeated'; } ?>
                <input type="password" name="repeat" placeholder=<?=$pp ?> required />
            </div>
            <div class="input-field">
                <span class="sign-inputs">Email</span>
                <input type="email" name="email" placeholder="user@email.com" required />
            </div>
            <button type="submit" class="btn">Sign Up</button>
        </form>
    </div>
</div>