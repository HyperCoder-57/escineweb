-- Crear ENUM si aún no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_Seats_status') THEN
        CREATE TYPE "enum_Seats_status" AS ENUM ('reserved', 'available');
    END IF;
END
$$;


INSERT INTO "Movies" ( title, genre, duration, poster, "releaseYear", "createdAt", "updatedAt") VALUES


('Cadena perpetua', 'Drama, Crimen', 143, 'https://image.tmdb.org/t/p/w500/uRRTV7p6l2ivtODWJVVAMRrwTn2.jpg', 1994, NOW(), NOW()),
('El padrino', 'Drama, Crimen', 175, 'https://image.tmdb.org/t/p/w500/5HlLUsmsv60cZVTzVns9ICZD6zU.jpg', 1972, NOW(), NOW()),
('El Padrino Parte II', 'Drama, Crimen', 200, 'https://image.tmdb.org/t/p/w500/mbry0W5PRylSUHsYzdiY2FSJwze.jpg', 1974, NOW(), NOW()),
('La lista de Schindler', 'Drama, Historia, Belica', 195, 'https://image.tmdb.org/t/p/w500/3Ho0pXsnMxpGJWqdOi0KDNdaTkT.jpg', 1993, NOW(), NOW()),
('12 hombres sin piedad', 'Drama', 92, 'https://image.tmdb.org/t/p/w500/qyVoDb3EKO5SnhpSRpztNmZjo70.jpg', 1957, NOW(), NOW()),
('El viaje de Chihiro', 'Animacion, Familia, Fantasi­a', 122, 'https://image.tmdb.org/t/p/w500/laXrmaTRuroArSPfsGlvTbeWxVA.jpg', 2001, NOW(), NOW()),
('El caballero oscuro', 'Drama, Accion, Crimen, Suspense', 152, 'https://image.tmdb.org/t/p/w500/8QDQExnfNFOtabLDKqfDQuHDsIg.jpg', 2008, NOW(), NOW()),
('Un amor contra viento y marea', 'Comedia, Drama, Romance', 189, 'https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg', 1995, NOW(), NOW()),
('La milla verde', 'Fantasi­a, Drama, Crimen', 189, 'https://image.tmdb.org/t/p/w500/aBQiJRxGRrX0mXFMjxyzWYFtEnf.jpg', 1999, NOW(), NOW()),
('Parasitos', 'Comedia, Suspense, Drama', 132, 'https://image.tmdb.org/t/p/w500/4N55tgxDW0RRATyrZHbx0q9HUKv.jpg', 2019, NOW(), NOW()),
('Pulp Fiction', 'Suspense, Crimen', 154, 'https://image.tmdb.org/t/p/w500/hNcQAuquJxTxl2fJFs1R42DrWcf.jpg', 1994, NOW(), NOW()),
('El señor de los anillos El retorno del rey', 'Aventura, Fantasi­a, Accion', 202, 'https://image.tmdb.org/t/p/w500/mWuFbQrXyLk2kMBKF9TUPtDwuPx.jpg', 2003, NOW(), NOW()),
('Your Name', 'Animacion, Romance, Drama', 106, 'https://image.tmdb.org/t/p/w500/iaiy3tg9QVkDpObm1IGqmbC9A5C.jpg', 2016, NOW(), NOW()),
('Forrest Gump', 'Comedia, Drama, Romance', 142, 'https://image.tmdb.org/t/p/w500/oiqKEhEfxl9knzWXvWecJKN3aj6.jpg', 1994, NOW(), NOW()),
('El bueno, el feo y el malo', 'Western', 161, 'https://image.tmdb.org/t/p/w500/rDD8KmcPLfHabdPMs7S7XjKL1mV.jpg', 1966, NOW(), NOW()),
('Interstellar', 'Aventura, Drama, Ciencia ficcion', 169, 'https://image.tmdb.org/t/p/w500/fbUwSqYIP0isCiJXey3staY3DNn.jpg', 2014, NOW(), NOW()),
('Uno de los nuestros', 'Drama, Crimen', 146, 'https://image.tmdb.org/t/p/w500/ii4bYbHN6HtVGK700AlphS56hD2.jpg', 1990, NOW(), NOW()),
('Los siete samurais', 'Accion, Drama', 207, 'https://image.tmdb.org/t/p/w500/zr4DkzWIMjaWtj6hlsbN6dnNeTX.jpg', 1954, NOW(), NOW()),
('La tumba de las luciernagas', 'Animacion, Drama, Belica', 95, 'https://image.tmdb.org/t/p/w500/juKTAn2AuoE9MvCNvf3kwZrt1t4.jpg', 1988, NOW(), NOW()),
('La vida es bella', 'Comedia, Drama', 117, 'https://image.tmdb.org/t/p/w500/aZ7MFlKPfB02Lr9NwZQ4vsYRgcy.jpg', 1997, NOW(), NOW()),
('Cinema Paradiso', 'Drama, Romance', 155, 'https://image.tmdb.org/t/p/w500/hHwsr3t5n7VVUbPyU8VZswn0jkL.jpg', 1988, NOW(), NOW()),
('El Club de la Lucha', 'Drama', 139, 'https://image.tmdb.org/t/p/w500/sgTAWJFaB2kBvdQxRGabYFiQqEK.jpg', 1999, NOW(), NOW()),
('O Auto da Compadecida', 'Comedia, Drama, Fantasi­a', 104, 'https://image.tmdb.org/t/p/w500/xWCKF7hgOicb3A0XiY13SdlwRcn.jpg', 2000, NOW(), NOW()),
('Ciudad de Dios', 'Drama, Crimen', 130, 'https://image.tmdb.org/t/p/w500/2MztAexSbCVszezV0bKMKZPJAZf.jpg', 2002, NOW(), NOW()),
('Cosas imposibles', 'Familia, Drama', 88, 'https://image.tmdb.org/t/p/w500/eaf7GQj0ieOwm08rrvjJQNbN0kN.jpg', 2021, NOW(), NOW()),
('Psicosis', 'Terror, Suspense, Misterio', 109, 'https://image.tmdb.org/t/p/w500/xFbnc2QPG5H5gYWsGbZT4q8Akya.jpg', 1960, NOW(), NOW()),
('El señor de los anillos La comunidad del anillo', 'Aventura, Fantasi­a, Accion', 179, 'https://image.tmdb.org/t/p/w500/9xtH1RmAzQ0rrMBNUMXstb2s3er.jpg', 2001, NOW(), NOW()),
('Harakiri', 'Accion, Drama, Historia', 133, 'https://image.tmdb.org/t/p/w500/3uRTEObwdN7Q3u5xswL2Vf8EsOn.jpg', 1962, NOW(), NOW()),
('Alguien volo sobre el nido del cuco', 'Drama', 133, 'https://image.tmdb.org/t/p/w500/lBYmCynNEPt7HVaJvuXgfHvLhbJ.jpg', 1975, NOW(), NOW()),
('Gabriels Inferno', 'Romance, Drama', 122, 'https://image.tmdb.org/t/p/w500/yXRoyYzIo17HfANn07oXYdyBy4h.jpg', 2020, NOW(), NOW()),
('Erase una vez en America', 'Drama, Crimen', 225, 'https://image.tmdb.org/t/p/w500/u4VnqaxINtKVscmdldZsBojU6jm.jpg', 1984, NOW(), NOW()),
('El señor de los anillos Las dos torres', 'Aventura, Fantasi­a, Accion', 180, 'https://image.tmdb.org/t/p/w500/z632eZtXaw76ZE5mMMGOBXCpm1T.jpg', 2002, NOW(), NOW()),
('Spider-Man un nuevo universo', 'Animacion, Accion, Aventura, Ciencia ficcion', 117, 'https://image.tmdb.org/t/p/w500/xRMZikjAHNFebD1FLRqgDZeGV4a.jpg', 2018, NOW(), NOW()),
('El castillo ambulante', 'Fantasi­a, Animacion, Aventura', 120, 'https://image.tmdb.org/t/p/w500/p8EARnEw8KPZzlZg3vkseYVMczu.jpg', 2004, NOW(), NOW()),
('El imperio contraataca', 'Aventura, Accion, Ciencia ficcion', 124, 'https://image.tmdb.org/t/p/w500/eU7KcNAOeZj9PBIcGUMSsuJz8qj.jpg', 1980, NOW(), NOW()),
('So Won', 'Drama', 123, 'https://image.tmdb.org/t/p/w500/PZlNvDwKwHeHUsXnd6SEDXWZNn.jpg', 2013, NOW(), NOW()),
('A Silent Voice', 'Animacion, Drama, Romance', 130, 'https://image.tmdb.org/t/p/w500/jAhaGJPreBrSWMN92MP2jjIDJKy.jpg', 2016, NOW(), NOW()),
('Gabriel''s Inferno Part II', 'Romance, Drama', 106, 'https://image.tmdb.org/t/p/w500/x5o8cLZfEXMoZczTYWLrUo1P7UJ.jpg', 2020, NOW(), NOW()),
('El pianista', 'Drama, Belica', 150, 'https://image.tmdb.org/t/p/w500/mxfLOWnHnSlbdraKfzRn5mqoqk7.jpg', 2002, NOW(), NOW()),
('Whiplash', 'Drama, Musica', 105, 'https://image.tmdb.org/t/p/w500/sL32IZkyjlF7otj5vcUxiKSKzg5.jpg', 2014, NOW(), NOW()),
('El infierno de Gabriel Parte 3', 'Romance, Drama', 102, 'https://image.tmdb.org/t/p/w500/fYtHxTxlhzD4QWfEbrC1rypysSD.jpg', 2020, NOW(), NOW()),
('Seven', 'Crimen, Misterio, Suspense', 127, 'https://image.tmdb.org/t/p/w500/uVPcVz4b2hnSGrXYLdIGRXwcivs.jpg', 1995, NOW(), NOW()),
('Origen', 'Accion, Ciencia ficcion, Aventura', 148, 'https://image.tmdb.org/t/p/w500/tXQvtRWfkUUnWJAn2tN3jERIUG.jpg', 2010, NOW(), NOW()),
('Primal Tales of Savagery', 'Accion, Aventura, Animacion, Drama', 85, 'https://image.tmdb.org/t/p/w500/9NBBkdxH0TjQEBSN2AzeE1sgsF9.jpg', 2019, NOW(), NOW()),
('Radical', 'Drama', 127, 'https://image.tmdb.org/t/p/w500/eSatbygYZp8ooprBHZdb6GFZxGB.jpg', 2023, NOW(), NOW()),
('La ventana indiscreta', 'Suspense, Misterio', 112, 'https://image.tmdb.org/t/p/w500/fH1MipE8PXGg0rlI5cUdzxKnyA2.jpg', 1954, NOW(), NOW()),
('El silencio de los corderos', 'Crimen, Drama, Suspense', 118, 'https://image.tmdb.org/t/p/w500/8FdQQ3cUCs9goEOr1qUFaHackoJ.jpg', 1991, NOW(), NOW()),
('El infierno del odio', 'Drama, Crimen, Misterio, Suspense', 143, 'https://image.tmdb.org/t/p/w500/pXXemxg8s7PHlide0A6cmb3UVU8.jpg', 1963, NOW(), NOW()),
('Un angel en nuestras vidas', 'Drama, Familia', 87, 'https://image.tmdb.org/t/p/w500/yfnJ5qIYx7q33fY4jqv9Pu95RSg.jpg', 2020, NOW(), NOW()),
('Spider-Man Cruzando el Multiverso', 'Animacion, Accion, Aventura, Ciencia ficcion', 140, 'https://image.tmdb.org/t/p/w500/37WcNMgNOMxdhT87MFl7tq7FM1.jpg', 2023, NOW(), NOW()),
('En la misma clase', 'Romance, Animacion', 60, 'https://image.tmdb.org/t/p/w500/7byisQANRFHf9SC60n5PaLywuMa.jpg', 2016, NOW(), NOW()),
('La leyenda de Hei', 'Animacion, Fantasi­a, Accion', 102, 'https://image.tmdb.org/t/p/w500/ogMVWcW6TSBl65heyUHnuYpTlBm.jpg', 2019, NOW(), NOW()),
('American History X', 'Drama', 119, 'https://image.tmdb.org/t/p/w500/h2cDqHvnZkycBJKoF7WhcQ2MX1V.jpg', 1998, NOW(), NOW()),
('Contraataque', 'Accion, Aventura, Suspense', 85, 'https://image.tmdb.org/t/p/w500/kxnFdLJhi37ZVFDCL1ka0yeQVU5.jpg', 2025, NOW(), NOW()),
('La princesa Mononoke', 'Aventura, Fantasi­a, Animacion', 134, 'https://image.tmdb.org/t/p/w500/7fUjg7jky5FnnNSiSbWyOlxVYGU.jpg', 1997, NOW(), NOW()),
('Las Quintillizas La Peli­cula', 'Animacion, Comedia, Romance', 136, 'https://image.tmdb.org/t/p/w500/6QsExD8uP3vLk64yLnxD8MSS4A6.jpg', 2022, NOW(), NOW()),
('Regreso al futuro', 'Aventura, Comedia, Ciencia ficcion', 116, 'https://image.tmdb.org/t/p/w500/k3naCOK9ZQ5Mc7HhfHKN3zyray9.jpg', 1985, NOW(), NOW()),
('Robot salvaje', 'Animacion, Ciencia ficcion, Familia', 101, 'https://image.tmdb.org/t/p/w500/a0a7RC01aTa7pOnskgJb3mCD2Ba.jpg', 2024, NOW(), NOW()),
('Un di­a de verano', 'Crimen, Drama, Romance', 237, 'https://image.tmdb.org/t/p/w500/g5gMOcn0vFUITufKSxxL2WCyBIU.jpg', 1991, NOW(), NOW()),
('Vivir', 'Drama', 123, 'https://image.tmdb.org/t/p/w500/eDg67pLOtZAewt0hKIoinECpzCG.jpg', 1952, NOW(), NOW()),
('El club de los poetas muertos', 'Drama', 128, 'https://image.tmdb.org/t/p/w500/lzvt7u7A6oxePzczURHQXEUTXNS.jpg', 1989, NOW(), NOW()),
('Perfect Blue', 'Animacion, Suspense', 81, 'https://image.tmdb.org/t/p/w500/kk8p22JheV6MB0fBXOOUgZK9UWQ.jpg', 1998, NOW(), NOW()),
('El profesional (Leon)', 'Crimen, Drama, Accion', 110, 'https://image.tmdb.org/t/p/w500/eWf4KEaCpiWcDOBkTiNQ0328k3H.jpg', 1994, NOW(), NOW()),
('Josee, el tigre y los peces', 'Animacion, Drama, Romance', 98, 'https://image.tmdb.org/t/p/w500/buF1mmMRAiJZMOK5Qg3DBTtZ5XO.jpg', 2020, NOW(), NOW()),
('El gran dictador', 'Comedia, Belica', 125, 'https://image.tmdb.org/t/p/w500/w7ovs2B2AlNRig68HOmuYVQRroQ.jpg', 1940, NOW(), NOW()),
('Dedicada A Mi Ex', 'Drama, Comedia', 94, 'https://image.tmdb.org/t/p/w500/xc4bTXVwYNXi10jG9dwcaYt5IpU.jpg', 2019, NOW(), NOW()),
('El crepusculo de los dioses', 'Drama', 110, 'https://image.tmdb.org/t/p/w500/sVILYytrnjsEXBcZyxHMJ5jP74t.jpg', 1950, NOW(), NOW()),
('Erase una vez un estudio', 'Animacion, Familia, Fantasi­a, Comedia', 9, 'https://image.tmdb.org/t/p/w500/81BdCKeRtyHr0muZY72zYr0JM3j.jpg', 2023, NOW(), NOW()),
('Hasta que llego su hora', 'Drama, Western', 166, 'https://image.tmdb.org/t/p/w500/upiek8u4rHTrOJW9B0woXe4A4h7.jpg', 1968, NOW(), NOW()),
('The End of Evangelion', 'Animacion, Ciencia ficcion, Accion, Drama', 90, 'https://image.tmdb.org/t/p/w500/9jbxvKB937BWeYAmMKZTqPxBLsk.jpg', 1997, NOW(), NOW()),
('Una mujer y tres hombres', 'Drama, Comedia', 124, 'https://image.tmdb.org/t/p/w500/jsjfvG1971tCUPtvj1dNSPWNzST.jpg', 1974, NOW(), NOW()),
('Tiempos modernos', 'Comedia, Drama, Romance', 87, 'https://image.tmdb.org/t/p/w500/f3uOJseH4oPEo0Sq7WyQ6IwMG4l.jpg', 1936, NOW(), NOW()),
('En el bosque de la luz de las luciernagas', 'Romance, Animacion, Fantasi­a', 45, 'https://image.tmdb.org/t/p/w500/xE763r1dnYji0gOxrSxBtzyouSf.jpg', 2011, NOW(), NOW()),
('¡Que bello es vivir!', 'Drama, Familia, Fantasi­a', 129, 'https://image.tmdb.org/t/p/w500/63W4MsB8e5whhPNyxhRVTzSsCje.jpg', 1946, NOW(), NOW()),
('Given The Movie', 'Animacion, Drama, Musica, Romance', 59, 'https://image.tmdb.org/t/p/w500/fsEq2LddodaHvhs4mTZAaqOV6sR.jpg', 2020, NOW(), NOW()),
('Violet Evergarden La peli­cula', 'Animacion, Fantasi­a, Romance, Drama', 140, 'https://image.tmdb.org/t/p/w500/5E1JUJAWzd8ylHIhTLsowW2RCBE.jpg', 2020, NOW(), NOW()),
('Intocable', 'Drama, Comedia', 112, 'https://image.tmdb.org/t/p/w500/edPWyHqknFuxFY3sdmC3LtJITWC.jpg', 2011, NOW(), NOW()),
('Apocalypse Now', 'Drama, Belica', 147, 'https://image.tmdb.org/t/p/w500/zJXRrkJTlcb5x87v4VWN1zZX0Xk.jpg', 1979, NOW(), NOW()),
('Luces de la ciudad', 'Comedia, Drama, Romance', 87, 'https://image.tmdb.org/t/p/w500/15bnFY02iqWB6jN0sjxsxMNrmWS.jpg', 1931, NOW(), NOW()),
('El rey leon', 'Familia, Animacion, Drama', 85, 'https://image.tmdb.org/t/p/w500/b0MxU37dNmMwKtoPVYPKOZSIrIn.jpg', 1994, NOW(), NOW()),
('Milagro en la celda 7', 'Drama', 132, 'https://image.tmdb.org/t/p/w500/scxBIHaT1ZiPDPJu3vKd9Yn5gBA.jpg', 2019, NOW(), NOW()),
('Senderos de gloria', 'Belica, Drama, Historia', 88, 'https://image.tmdb.org/t/p/w500/vz8J8nTbF5JP7PQK4VNVsO8rzCy.jpg', 1957, NOW(), NOW()),
('La leyenda del pianista en el oceano', 'Drama, Musica', 125, 'https://image.tmdb.org/t/p/w500/td38NLfhvwotZhKKHGXd71BKiox.jpg', 1998, NOW(), NOW()),
('Old Boy', 'Drama, Suspense, Misterio, Accion', 119, 'https://image.tmdb.org/t/p/w500/45kRW1xgTq3QrZltL9mY9e9iYkH.jpg', 2003, NOW(), NOW()),
('Clouds', 'Musica, Drama, Romance', 121, 'https://image.tmdb.org/t/p/w500/d0OdD1I8qAfETvE9Rp9Voq7R8LR.jpg', 2020, NOW(), NOW()),
('La evasion', 'Drama, Suspense, Crimen', 132, 'https://image.tmdb.org/t/p/w500/Al1F9o6fDkOBRngeG2FTJ0f9xTv.jpg', 1960, NOW(), NOW()),
('Seishun Buta Yarou wa Yumemiru Shoujo no Yume wo Minai', 'Animacion, Romance, Drama, Fantasi­a', 90, 'https://image.tmdb.org/t/p/w500/2Tpyv4cwwyE2xV9bqx7DOWnUCZ5.jpg', 2019, NOW(), NOW()),
('Taylor Swift Gira de estadios Reputation', 'Musica', 125, 'https://image.tmdb.org/t/p/w500/u6oXUTtOuJRPdUgUuPAVVJPSKCo.jpg', 2018, NOW(), NOW()),
('Como cai­do del cielo', 'Comedia, Drama, Musica', 112, 'https://image.tmdb.org/t/p/w500/xg6QZdlHrq2dtSK8cfnQQMnmpeY.jpg', 2019, NOW(), NOW()),
('Vengadores Endgame', 'Aventura, Ciencia ficcion, Accion', 181, 'https://image.tmdb.org/t/p/w500/br6krBFpaYmCSglLBWRuhui7tPc.jpg', 2019, NOW(), NOW()),
('Klaus', 'Animacion, Familia, Aventura, Comedia, Fantasi­a', 97, 'https://image.tmdb.org/t/p/w500/aLniylyJlbXEdxvaGSuQkRACWUx.jpg', 2019, NOW(), NOW()),
('Quiero comerme tu pancreas', 'Animacion, Drama, Romance', 109, 'https://image.tmdb.org/t/p/w500/1rgR2oMVFuk4ltx6tYXYskPaA6Y.jpg', 2018, NOW(), NOW()),
('Toda una vida en un año', 'Drama, Romance', 107, 'https://image.tmdb.org/t/p/w500/xGDbQI7Gtgurt9W5ez6Tim2lpS2.jpg', 2020, NOW(), NOW()),
('A dos metros de ti', 'Romance, Drama', 125, 'https://image.tmdb.org/t/p/w500/4F5LggLzv2VIa0MJT2ETN8bWtr2.jpg', 2019, NOW(), NOW()),
('Vengadores Infinity War', 'Aventura, Accion, Ciencia ficcion', 156, 'https://image.tmdb.org/t/p/w500/ksBQ4oHQDdJwND8H90ay8CbMihU.jpg', 2018, NOW(), NOW()),
('Ven y mira', 'Drama, Belica', 142, 'https://image.tmdb.org/t/p/w500/3trCyueh2CBTlRrpq7xElqSWHTh.jpg', 1985, NOW(), NOW()),
('Green Book', 'Drama, Historia', 130, 'https://image.tmdb.org/t/p/w500/od2A7qPtpimcYfqfKXkpHqoKyuS.jpg', 2018, NOW(), NOW()),
('Mommy', 'Drama', 134, 'https://image.tmdb.org/t/p/w500/1mjhmc2iG8Oe5WTqevECTUQ5iWP.jpg', 2014, NOW(), NOW()),
('Matrix', 'Accion, Ciencia ficcion', 138, 'https://image.tmdb.org/t/p/w500/tpW2X2DvxtTHJ61iJ7zNYYrJihs.jpg', 1999, NOW(), NOW()),
('Predator Asesino de asesinos', 'Animacion, Ciencia ficcion, Accion', 85, 'https://image.tmdb.org/t/p/w500/qHDsrBZJRx6ZCO4tocFh3gnbosU.jpg', 2025, NOW(), NOW()),
('El contable 2', 'Crimen, Suspense, Accion', 133, 'https://image.tmdb.org/t/p/w500/jcV9YfjBRo6occxqeWtEiyWwMoG.jpg', 2025, NOW(), NOW()),
('Lilo y Stitch', 'Familia, Comedia, Ciencia ficcion', 108, 'https://image.tmdb.org/t/p/w500/i9aIi5KreaAjgjaZFfcb3ir4wHR.jpg', 2025, NOW(), NOW()),
('Los pecadores', 'Terror, Accion, Suspense', 138, 'https://image.tmdb.org/t/p/w500/gL6puhup6PXqrKqItWbGA8LF529.jpg', 2025, NOW(), NOW()),
('Shadow Force', 'Accion, Suspense, Drama', 103, 'https://image.tmdb.org/t/p/w500/7IEW24vBiZerZrDlgLVSUU3oT1C.jpg', 2025, NOW(), NOW()),
('Una peli­cula de Minecraft', 'Familia, Comedia, Aventura, Fantasi­a', 101, 'https://image.tmdb.org/t/p/w500/rZYYmjgyF5UP1AVsvhzzDOFLCwG.jpg', 2025, NOW(), NOW()),
('Destino final Lazos de sangre', 'Terror, Misterio', 110, 'https://image.tmdb.org/t/p/w500/frNkbclQpexf3aUzZrnixF3t5Hw.jpg', 2025, NOW(), NOW()),
('La hermanastra fea', 'Terror, Comedia, Fantasi­a, Drama', 109, 'https://image.tmdb.org/t/p/w500/mk4vGUy03tUCgJsOuwkYy877RYo.jpg', 2025, NOW(), NOW()),
('Mision Imposible - Sentencia final', 'Accion, Aventura, Suspense', 169, 'https://image.tmdb.org/t/p/w500/haOjJGUV00dKlZaJWgjM1UD1cJV.jpg', 2025, NOW(), NOW()),
('Ballerina, del universo de John Wick', 'Accion, Suspense, Crimen', 125, 'https://image.tmdb.org/t/p/w500/gQCrYmvCK7JCLXjCGTMRF5Lzr5c.jpg', 2025, NOW(), NOW()),
('K.O.', 'Accion, Drama, Aventura', 84, 'https://image.tmdb.org/t/p/w500/eIQTKbaXOSfSHQGF4x9fN8ZPkEl.jpg', 2025, NOW(), NOW()),
('Warfare Tiempo de guerra', 'Belica, Accion', 95, 'https://image.tmdb.org/t/p/w500/kcVPbpoUwzWzcg6Wg8tX0hWXwwP.jpg', 2025, NOW(), NOW()),
('Terror en el Ri­o', 'Terror, Accion, Aventura, Suspense', 85, 'https://image.tmdb.org/t/p/w500/kIO7eVOivYH9LptLxdXio5KRor.jpg', 2025, NOW(), NOW()),
('Until Dawn', 'Terror, Misterio', 103, 'https://image.tmdb.org/t/p/w500/exgfubqSbF4veI4uXFOdbV66gEf.jpg', 2025, NOW(), NOW()),
('Blancanieves', 'Familia, Fantasi­a', 99, 'https://image.tmdb.org/t/p/w500/sm91FNDF6OOKU4hT9BDW6EMoyDB.jpg', 2025, NOW(), NOW()),
('Tierras perdidas', 'Accion, Fantasi­a, Aventura', 102, 'https://image.tmdb.org/t/p/w500/sLDxndoqFWwJEq7iEdYQBzPjUDQ.jpg', 2025, NOW(), NOW()),
('Thunderbolts*', 'Accion, Ciencia ficcion, Aventura', 127, 'https://image.tmdb.org/t/p/w500/cGOBis1KNC8AkYMcOEw4lCycfD1.jpg', 2025, NOW(), NOW()),
('Netflix Tudum 2025', '', 116, 'https://image.tmdb.org/t/p/w500/jTZ5yiFpJPc19lA6uoT9zafHr0f.jpg', 2025, NOW(), NOW()),
('El Rey de Reyes', 'Familia, Fantasi­a, Drama, Aventura, Animacion', 104, 'https://image.tmdb.org/t/p/w500/yhN5fRdZogzoqwDqHGHHvkoNVP4.jpg', 2025, NOW(), NOW()),
('Annabelle', 'Terror', 98, 'https://image.tmdb.org/t/p/w500/wktIMdLEtHSS7o6XO6q57KRYPWi.jpg', 2014, NOW(), NOW()),
('Karol G Mañana fue muy bonito', 'Documental, Musica', 108, 'https://image.tmdb.org/t/p/w500/5aXoQYwaQ7JJVUWclHAEXJgiS2M.jpg', 2025, NOW(), NOW()),
('Orgullo y prejuicio', 'Drama, Romance', 127, 'https://image.tmdb.org/t/p/w500/oixzLjpyaLagLa8UREts1NiHr6F.jpg', 2005, NOW(), NOW()),
('Scream', 'Crimen, Terror, Misterio', 111, 'https://image.tmdb.org/t/p/w500/m1VhLwObGbEoHbUQEMK6bg2oISW.jpg', 1996, NOW(), NOW()),
('Guardianes de la Noche Tren infinito', 'Animacion, Accion, Fantasi­a, Suspense', 117, 'https://image.tmdb.org/t/p/w500/8t29MfbEkEZixjVbjRkqI5NyFR4.jpg', 2020, NOW(), NOW()),
('Nonnas', 'Comedia', 114, 'https://image.tmdb.org/t/p/w500/wCZLjZ8sBXSuP7LmrBWvuXj6UAe.jpg', 2025, NOW(), NOW()),
('M3GAN', 'Ciencia ficcion, Terror', 102, 'https://image.tmdb.org/t/p/w500/tv3Yjn78U8hFGFrkSypiIhHNUh3.jpg', 2022, NOW(), NOW()),
('Soul to Squeeze', 'Suspense, Drama, Ciencia ficcion', 86, 'https://image.tmdb.org/t/p/w500/bBJGmU0ORhmo0liy7c3MdI8qOMU.jpg', 2025, NOW(), NOW()),
('Young Hearts', 'Drama, Romance', 99, 'https://image.tmdb.org/t/p/w500/nS0eznZA0eVMyOrqaGmdJwn3gz4.jpg', 2024, NOW(), NOW()),
('Los silenciosos', 'Accion, Drama', 110, 'https://image.tmdb.org/t/p/w500/ywHCbLbTremCJBiHRa63rlrXmWs.jpg', 2024, NOW(), NOW()),
('La mas fan', 'Comedia', 91, 'https://image.tmdb.org/t/p/w500/wgUmsekYPOt9ZQ8ero91qRnmhQY.jpg', 2025, NOW(), NOW()),
('Mazel Tov', 'Drama, Comedia', 97, 'https://image.tmdb.org/t/p/w500/j8EORyEJyVk7wSyUoy0bb4lVkuu.jpg', 2025, NOW(), NOW()),
('El ejecutor', 'Accion, Crimen', 118, 'https://image.tmdb.org/t/p/w500/4o4fh62VZewnBotiVT33d0dvPsX.jpg', 2024, NOW(), NOW()),
('Nosferatu', 'Terror, Fantasi­a', 133, 'https://image.tmdb.org/t/p/w500/jivUhECegXI3OYtPVflWoIDtENt.jpg', 2024, NOW(), NOW()),
('Home Sweet Home Rebirth', 'Terror, Fantasi­a, Suspense, Misterio, Accion', 93, 'https://image.tmdb.org/t/p/w500/9rCBCm9cyI4JfLEhx3EncyncMR3.jpg', 2025, NOW(), NOW()),
('Doble espionaje', 'Accion, Crimen, Suspense', 95, 'https://image.tmdb.org/t/p/w500/chIQxgimGbIFnuFsLqpcoTbsH9.jpg', 2025, NOW(), NOW()),
('La mitad de Ana', 'Drama', 89, 'https://image.tmdb.org/t/p/w500/c24RWnJzwAtWZ039o9u6K7c8jyw.jpg', 2025, NOW(), NOW()),
('Corazon delator', 'Romance, Drama', 89, 'https://image.tmdb.org/t/p/w500/5XgEqq8KJVW0R0NhDZCdBV2Pjr0.jpg', 2025, NOW(), NOW()),

('Flow', 'Animacion, Fantasi­a, Aventura', 84, 'https://image.tmdb.org/t/p/w500/337MqZW7xii2evUDVeaWXAtopff.jpg', 2024, NOW(), NOW()),
('Hurry Up Tomorrow', 'Suspense, Musica', 106, 'https://image.tmdb.org/t/p/w500/wbM7cWkaHpUGiLkjd2ZaJiHLLCr.jpg', 2025, NOW(), NOW()),
('La trama fenicia', 'Aventura, Comedia', 102, 'https://image.tmdb.org/t/p/w500/rSjhapG9pfcJjKogZQPICHW0GwU.jpg', 2025, NOW(), NOW()),
('La mujer de las sombras', 'Terror, Misterio', 87, 'https://image.tmdb.org/t/p/w500/3hcfxkII892XuzoSW0JvdE68JAq.jpg', 2025, NOW(), NOW()),
('La rinoceronte Lulu', 'Animacion, Familia', 47, 'https://image.tmdb.org/t/p/w500/benRKKXC4337aP5rsnW91afi2PS.jpg', 2025, NOW(), NOW()),
('Fight or flight (sicarios en el aire)', 'Accion, Comedia, Suspense', 101, 'https://image.tmdb.org/t/p/w500/2CuB6MkeerEkfKCKF8TUgjyiVPS.jpg', 2025, NOW(), NOW()),
('Memorias de un caracol', 'Animacion, Drama, Comedia', 94, 'https://image.tmdb.org/t/p/w500/itb0oMYkglNqMUkXE7mrDyFtwuL.jpg', 2024, NOW(), NOW()),
('La casa al final de la curva', 'Suspense, Comedia', 111, 'https://image.tmdb.org/t/p/w500/lo2MCdStguhty8Jk05qfp9QYuWJ.jpg', 2025, NOW(), NOW()),
('Norbert', 'Animacion, Aventura, Comedia', 75, 'https://image.tmdb.org/t/p/w500/9kUC13Ssxfjlc8leD7QpELCDlDU.jpg', 2025, NOW(), NOW()),
('Ne Zha 2', 'Animacion, Fantasi­a, Aventura', 144, 'https://image.tmdb.org/t/p/w500/ujmb2pnm15gB3LUDXmROESsmNtn.jpg', 2025, NOW(), NOW()),
('Blindado', 'Suspense, Terror', 95, 'https://image.tmdb.org/t/p/w500/tDGrzf1DNQFead0uMcKVjd3cAIU.jpg', 2025, NOW(), NOW()),
('Loco Por Ella', 'Comedia', 100, 'https://image.tmdb.org/t/p/w500/6PbSSN2BT22ZMsMaD7m8cGaqk3L.jpg', 2025, NOW(), NOW()),
('28 di­as despues', 'Terror, Suspense, Ciencia ficcion', 113, 'https://image.tmdb.org/t/p/w500/sIGsLU7hMDVKhGKsRFcFxUAtFyT.jpg', 2002, NOW(), NOW()),
 ('Devuelvemela', 'Terror', 104, 'https://image.tmdb.org/t/p/w500/1zcH6vJs0TnCVXK7TGdTkEzR5J8.jpg', 2025, NOW(), NOW()),
('Corazones rotos', 'Crimen, Drama, Romance', 166, 'https://image.tmdb.org/t/p/w500/qaDDFibgdo3zJxoHb1pKLVNnciV.jpg', 2024, NOW(), NOW()),
 ('The Surfer', 'Suspense, Drama', 100, 'https://image.tmdb.org/t/p/w500/5ZEksAUM9z3XcvzzA5mO9POyxMx.jpg', 2025, NOW(), NOW()),


('Viaje de fin de curso Mallorca', 'Comedia', 115, 'https://image.tmdb.org/t/p/w500/A8E8EqXqETV8ggPiOkHjaBU8H9N.jpg', 2025, NOW(), NOW()),
('Lo que le falta a esta estrella', 'Animacion, Romance, Ciencia ficcion', 96, 'https://image.tmdb.org/t/p/w500/6AmW8DglQ5VnOfW1lSMSOyfcwmW.jpg', 2025, NOW(), NOW()),
('Las chicas del balcon', 'Comedia, Terror, Fantasi­a', 105, 'https://image.tmdb.org/t/p/w500/QBrj5LazI61JjeYEScoIPbetaH.jpg', 2024, NOW(), NOW()),
('Juliet & Romeo', 'Romance, Drama', 122, 'https://image.tmdb.org/t/p/w500/4spOdjLgRAbIYO7mu22DQ2iInz7.jpg', 2025, NOW(), NOW()),
('Gru 4. Mi villano favorito', 'Animacion, Familia, Comedia, Ciencia ficcion', 94, 'https://image.tmdb.org/t/p/w500/wTpzSDfbUuHPEgqgt5vwVtPHhrb.jpg', 2024, NOW(), NOW()),
('Amenaza en el aire', 'Accion, Suspense', 91, 'https://image.tmdb.org/t/p/w500/8T6nkYb4W8BIeafmFffyfsRciTL.jpg', 2025, NOW(), NOW()),
('Una boda sin fin', 'Comedia, Romance, Fantasi­a', 81, 'https://image.tmdb.org/t/p/w500/uvygZlicNXBIpklnLuAbgwkMMSL.jpg', 2025, NOW(), NOW()),
('Death of a Unicorn', 'Terror, Fantasi­a, Comedia', 107, 'https://image.tmdb.org/t/p/w500/lXR32JepFwD1UHkplWqtBP1K79z.jpg', 2025, NOW(), NOW()),
('Broke', 'Western, Drama', 104, 'https://image.tmdb.org/t/p/w500/AmHHUQigx9di1MATgtXQ49DKBeN.jpg', 2025, NOW(), NOW()),
('Destino final', 'Terror', 98, 'https://image.tmdb.org/t/p/w500/6F3MEcGHeMAMxledi7vQfqkZRkc.jpg', 2000, NOW(), NOW()),
('The Fire And The Moth', 'Drama, Suspense', 100, 'https://image.tmdb.org/t/p/w500/hlE1jvehb0DYmLl2jxOeKuaE7lc.jpg', 2025, NOW(), NOW()),
('Wicked', 'Drama, Romance, Fantasi­a', 162, 'https://image.tmdb.org/t/p/w500/hDQXqvmmikekQ15uxhisBDwEA63.jpg', 2024, NOW(), NOW()),
('Wick Is Pain', 'Documental', 126, 'https://image.tmdb.org/t/p/w500/ctZ9bjmCYyfFt3cUepc9axr0zHs.jpg', 2025, NOW(), NOW()),
('Mision imposible', 'Aventura, Accion, Suspense', 110, 'https://image.tmdb.org/t/p/w500/xCpmxw3UUjv4PGzbIPOHeoKAV0l.jpg', 1996, NOW(), NOW()),
('Alba del desierto', 'Accion, Crimen, Misterio, Suspense', 89, 'https://image.tmdb.org/t/p/w500/vJxo8xxVnSaPAf9EdkjAfKwmoQK.jpg', 2025, NOW(), NOW()),


('Karate Kid Legends', 'Accion, Aventura, Drama', 94, 'https://image.tmdb.org/t/p/w500/efNhiZPk71FTYJ30dBkWMfc939D.jpg', 2025, NOW(), NOW()),
('Harta', 'Drama, Suspense', 105, 'https://image.tmdb.org/t/p/w500/eAf8Is1xX4gq4Jk14iFC1qhmT8R.jpg', 2025, NOW(), NOW()),
('Mountainhead', 'Drama, Comedia', 109, 'https://image.tmdb.org/t/p/w500/jZKK5mFKWbquxhAGMkRJtNYwk0I.jpg', 2025, NOW(), NOW()),
('La bala perdida 3', 'Accion, Crimen, Suspense, Drama', 112, 'https://image.tmdb.org/t/p/w500/AoXAvZDxcym6oONBvJ82tFjEGdY.jpg', 2025, NOW(), NOW()),
('The Legend of Ochi', 'Familia, Fantasi­a, Aventura', 95, 'https://image.tmdb.org/t/p/w500/cORMkM2j7JDXIYGLdz9EHUM84aD.jpg', 2025, NOW(), NOW()),
('La fuente de la eterna juventud', 'Aventura, Fantasi­a, Misterio', 126, 'https://image.tmdb.org/t/p/w500/9bhDUyOCrcwPLKbPyHM4uKOa65T.jpg', 2025, NOW(), NOW()),


('Como entrenar a tu dragon', 'Accion, Familia, Fantasi­a', 125, 'https://image.tmdb.org/t/p/w500/fTpbUIwdsfyIldzYvzQi2K4Icws.jpg', 2025, NOW(), NOW()),
('La viuda negra', 'Suspense, Misterio', 120, 'https://image.tmdb.org/t/p/w500/uuabL0qp3zygLDEjImbPiWR9j2e.jpg', 2025, NOW(), NOW()),
('Tin Soldier', 'Accion, Suspense', 87, 'https://image.tmdb.org/t/p/w500/6HU667T8fxoIvgsgu2eyaznntsp.jpg', 2025, NOW(), NOW()),
('Posei­da', 'Terror, Misterio', 88, 'https://image.tmdb.org/t/p/w500/t9MqBGo9BWainDLms66YLiDr5aS.jpg', 2025, NOW(), NOW()),

 

('Bambi, una vida en el bosque', 'Aventura, Familia, Documental', 77, 'https://image.tmdb.org/t/p/w500/fvtIXQH4JcifptPe0J9GfLDIOAQ.jpg', 2024, NOW(), NOW()),
('La calle del terror La reina del baile', 'Terror, Misterio', 90, 'https://image.tmdb.org/t/p/w500/kYeTcmPmuMvBgmwOdOtR5fUwRuH.jpg', 2025, NOW(), NOW()),


('Rosario', 'Terror', 88, 'https://image.tmdb.org/t/p/w500/mYK7OYW4w2ZujE8B8GGnVYZWHYD.jpg', 2025, NOW(), NOW()),
('Rust', 'Western', 133, 'https://image.tmdb.org/t/p/w500/tbJ3RkA2s6X5qrBzrYHYTxvDBui.jpg', 2025, NOW(), NOW()),




('Almas marcadas Rule + Shaw', 'Romance, Drama', 93, 'https://image.tmdb.org/t/p/w500/6rFgrN5k4c1HrVoyr0zNDdH4bK5.jpg', 2025, NOW(), NOW()),
('Este amor si­ que duele', 'Accion, Comedia, Romance', 83, 'https://image.tmdb.org/t/p/w500/z0jwBykM5DgPQ99lVlKI4sA0U0L.jpg', 2025, NOW(), NOW()),
('Paddington Aventura en la selva', 'Familia, Comedia, Aventura', 106, 'https://image.tmdb.org/t/p/w500/1irKRYNdm925a7avupfnmd6lrQD.jpg', 2024, NOW(), NOW()),
('Mision imposible 2', 'Aventura, Accion, Suspense', 123, 'https://image.tmdb.org/t/p/w500/mskE3W88cjMRrnKQye8pjmJu3O1.jpg', 2000, NOW(), NOW()),
 ('Ligaw', 'Drama, Romance', 85, 'https://image.tmdb.org/t/p/w500/yc8V3KEnhvPrzXpdYTXdTvjpOb5.jpg', 2025, NOW(), NOW()),
('Presence', 'Terror, Suspense, Drama', 84, 'https://image.tmdb.org/t/p/w500/8mRO5AdZ4Rn1crgjTHaUnWWhJXB.jpg', 2025, NOW(), NOW()),
('El despertar de la bestia', 'Accion, Terror, Suspense', 90, 'https://image.tmdb.org/t/p/w500/wHsQwrqiICdEkIXFcX968rVqB3s.jpg', 2024, NOW(), NOW()),
('Popeye the Slayer Man', 'Terror', 88, 'https://image.tmdb.org/t/p/w500/nVwu3mN7hr1yF467pGct3yQFM41.jpg', 2025, NOW(), NOW()),
('Zoe, mi amiga muerta', 'Comedia, Belica, Drama', 103, 'https://image.tmdb.org/t/p/w500/c7MRukxxhoEnX7SPGVxfUmQoWBc.jpg', 2024, NOW(), NOW()),
('Confidencial (Black Bag)', 'Drama, Misterio, Suspense', 94, 'https://image.tmdb.org/t/p/w500/1MTMK7xcZECsUir3EptGGI1fE2n.jpg', 2025, NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

-- Insertar sucursales
INSERT INTO "Branches" ("name", "location", "createdAt", "updatedAt")
VALUES
('Perisur', 'Ciudad de México', NOW(), NOW()),
('Santa Fe', 'Ciudad de México', NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;
 




-- Insertar usuario
INSERT INTO "Users" ("name", "email", "password", "verified", "createdAt", "updatedAt")
VALUES ('Juan Pérez', 'juan3@example.com', '$2b$10$Xo5zL2r5uXz3y7k9pQ8mO.8k9mN3pQ8mO.8k9mN3pQ8mO', true, NOW(), NOW())
ON CONFLICT ("email") DO NOTHING;

-- Insertar 192 showtimes
INSERT INTO "Showtimes" ("movieId", "branchId", "date", "time", "createdAt", "updatedAt")
SELECT
  m.id,
  (SELECT id FROM "Branches" WHERE "name" = CASE WHEN m.id % 2 = 1 THEN 'Perisur' ELSE 'Santa Fe' END LIMIT 1),
  ('2025-06-15'::date + (m.id / 4)::int),
  CASE
    WHEN m.id % 4 = 1 THEN '18:00:00'::time
    WHEN m.id % 4 = 2 THEN '20:00:00'::time
    WHEN m.id % 4 = 3 THEN '15:00:00'::time
    ELSE '22:00:00'::time
  END,
  NOW(),
  NOW()
FROM generate_series(1, 192) AS m(id)
ON CONFLICT ("branchId", "movieId", "date", "time") DO NOTHING;

-- Insertar asientos para los 192 showtimes (150 asientos por showtime)
INSERT INTO "Seats" ("showtimeId", "row", "col", "status", "createdAt", "updatedAt")
SELECT
  s.id,
  gs.row,
  gs.col,
  CASE
    WHEN gs.row = 0 AND gs.col = 0 THEN 'available'::"enum_Seats_status"
    WHEN RANDOM() < 0.3 THEN 'reserved'::"enum_Seats_status"
    ELSE 'available'::"enum_Seats_status"
  END,
  NOW(),
  NOW()
FROM "Showtimes" s
CROSS JOIN (
  SELECT row, col
  FROM generate_series(0, 9) AS row,
       generate_series(0, 14) AS col
) AS gs
WHERE s."movieId" BETWEEN 1 AND 192
ON CONFLICT ("showtimeId", "row", "col") DO NOTHING;

-- Insertar reserva para un solo usuario en asiento (0,0) para movieId = 1
WITH user_id AS (
  SELECT id FROM "Users" WHERE "email" = 'juan3@example.com' LIMIT 1
), showtime_id AS (
  SELECT id
  FROM "Showtimes"
  WHERE "movieId" = 1
    AND "date" = '2025-06-15'
    AND "time" = '18:00:00'::time
    AND "branchId" = (SELECT id FROM "Branches" WHERE "name" = 'Perisur' LIMIT 1)
  LIMIT 1
)
, seat_id AS (
  SELECT id FROM "Seats"
  WHERE "showtimeId" = (SELECT id FROM showtime_id)
    AND "row" = 0 AND "col" = 0
  LIMIT 1
)
INSERT INTO "Reservations" ("movieId", "userId", "showtimeId", "seatId", "status", "createdAt", "updatedAt")
SELECT
  1,
  (SELECT id FROM user_id),
  (SELECT id FROM showtime_id),
  (SELECT id FROM seat_id),
  'confirmed',
  NOW(),
  NOW()
WHERE EXISTS (SELECT 1 FROM seat_id)
ON CONFLICT DO NOTHING;