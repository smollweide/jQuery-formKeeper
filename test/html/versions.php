<html>
	<head>
		<meta charset="utf-8">
		<title>QUnit jQuery formKeeper / Versions</title>
	</head>
	<body>
		<ul>
            <?php

                $versions = array(
                     '1.6.1'
                    ,'1.7.1'
                    ,'1.7.2'
                    ,'1.8.3'
                    ,'1.10.2'
                    ,'1.11.0'
                    ,'1.11.1'
                    ,'2.1.0'
                    ,'2.1.1'
                );

                for ($i = 0; $i < count($versions); $i++) {
                    echo '<li><a href="?version='.$versions[$i].'">jQuery '.$versions[$i].'</a></li>';
                }

            ?>
		</ul>
	</body>
</html>
