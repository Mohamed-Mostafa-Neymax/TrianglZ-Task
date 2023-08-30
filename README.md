Important notes about some problems that I faced:

- I used (https://fakestoreapi.com/docs) for authentication
but they have a warning about signing up the user says:
If you send an object like the code above, it will return you an object with a new id. 
remember that nothing in real will insert into the database. 
so if you want to access the new id you will get a 404 error.
and because of that, signing user up not working but signing user in works fine.
and you can login with any user of these buy username and password.
users: User[] = [
        {
            email: "john@gmail.com",
            username: "johnd",
            password: "m38rmF$",
        },
        {
            email: "morrison@gmail.com",
            username: "mor_2314",
            password: "83r5^_",
        },
        {
            email: "kevin@gmail.com",
            username: "kevinryan",
            password: "kev02937@",
        },
        {
            email: "don@gmail.com",
            username: "donero",
            password: "ewedon",
        },
        {
            email: "derek@gmail.com",
            username: "derek",
            password: "jklg*_56",
        },
        {
            email: "david_r@gmail.com",
            username: "david_r",
            password: "3478*#54",
        },
        {
            email: "miriam@gmail.com",
            username: "snyder",
            password: "f238&@*$",
        },
        {
            email: "william@gmail.com",
            username: "hopkins",
            password: "William56$hj",
        },
        {
            email: "kate@gmail.com",
            username: "kate_h",
            password: "kfejk@*_",
        },
        {
            email: "jimmie@gmail.com",
            username: "jimmie_k",
            password: "klein*#%*",
        }
    ];

- For uploading the cover image on any cloud.
I tried to do that in firebase storage using @angular/fire and NgxDropzoneModule.
but unfortunately didn't work.
thanks.