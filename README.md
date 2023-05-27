# TB's vRP Discord Bot


**Settings Example**
```javascript
exports.settings = {
    Level1Perm: "1095821615213854850",
    Level2Perm: "1095821381389795389",
    Level3Perm: "1095819071800479815",
    guildid: "1095817057523740682",
    StatusEnabled: true,
    StatusChannel: "1105920806330052688",
    ServerIP: "coming soon",
    token: "MTA5NTgzMjIxMTU1MjQ4NTQ2Nw.GVSmCw.ck1BwjbMDYkv-yDaCqKlFLIxwPInqyU8kaC7V",
    botStatus: "Watching Over Gotham City",
}
```

**If You Wish To Use The Car Report System Use This Query**
```sql 
CREATE TABLE cardev (
    reportid int NOT NULL AUTO_INCREMENT,
    spawncode varchar(255),
    issue varchar(255), 
    reporter varchar(255), 
    claimed varchar(255),
    completed boolean,
    notes varchar(255),
    PRIMARY KEY (reportid)
);

CREATE TABLE cardevs (
    userid varchar(255),
    reportscompleted int,
    currentreport int,
    PRIMARY KEY(userid)
);
```
**If you need any support dm me TB#7894 or 534417173565931520**

