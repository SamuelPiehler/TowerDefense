var stats = {
    WellenNummern: [],
    upgradeCost: ()=>{
        preis= 0;
        tuerme.forEach((turm)=>{
            var id= turm.id;
            var typ = turm.typ;
        if (tuerme[id].upgradeStufe < maxUpgrade) {   //ist der Turm auf der maximalen upgradestufe
            if (tuerme[id].upgradeStufe == maxUpgrade - 1) {
              preis += parseInt(towertypen[typ][6]*preisMult)*2
            }
            else {
              preis += parseInt(parseInt(towertypen[typ][6]*preisMult)*(25+10*tuerme[id].upgradeStufe)/100);
            }}})
            return preis;
    },
    allDealtDamage:()=>{},
    allDamage:()=>{},
    getAllAttributesOfTower:(attribute)=>{
        var all = 0;
        var sum = [0];
        tuerme.forEach((turm)=>{
            sum.push(turm[attribute]);
            all += turm[attribute];
        });
        sum[0] = all;
        return sum;
    },
    upgradeAll: ()=>{
        var upgradecost = stats.upgradeCost();
        if(geld >= upgradecost){
            geld -= upgradecost;
            tuerme.forEach((turm)=>{try{turm.upgrade()}catch(e){}});
        }
    },
    testtuerme: (level = Infinity) =>{
        if(level > 0)
        for(var i = 1; i < map[0].length -1; i++){
        tuerme.push(new Turm(i, 1, 0, tuerme.length));
        }
        if(level > 1)
        for(var i = 3; i < map[0].length -3; i++){
            tuerme.push(new Turm(i, 3, 1, tuerme.length));
            }
            if(level > 3)
            tuerme.push(new Turm(1, 2, 2, tuerme.length));
            if(level > 3)
            tuerme.push(new Turm(14, 2, 2, tuerme.length));
            if(level > 4)
            for(var i = 6; i < map[0].length -2; i++){
                tuerme.push(new Turm(i, 9, 3, tuerme.length));
                }
                if(level > 5)
                {
                    tuerme.push(new Turm(7, 7, 9, tuerme.length,1));
                    tuerme.push(new Turm(8, 7, 9, tuerme.length,2));
                    if(level > 6)
                    {
                    tuerme.push(new Turm(9, 7, 9, tuerme.length,0));
                    tuerme.push(new Turm(5, 9, 9, tuerme.length,0));
                }
                }
                var geldb = geld;
                geld = Infinity;
            for(var i = 0; i<5;i++){
            stats.upgradeAll();
        }
        geld = geldb + 1;
        addGeld(-1);
    },
    startWellenTest: (welle) =>{
        teilWellenNummer = stats.getTeilWellenNummer(welle);
        gamespeed = 8;
        stats.testtuerme();  
    },
    getTeilWellenNummer: (welle) =>{
        stats.WellenNummern = [];
        var ba = 1;
        stats.WellenNummern.push([1,0]);
        gegnerWellen.forEach((welle,ind)=>{
            if(welle[4] == -1){
               ba++;               
        stats.WellenNummern.push([ba,ind + 1]);
    }
        });
var sol = 0;
        stats.WellenNummern.forEach((ind)=>{
            if(ind[0] == welle)
            sol = ind[1];
        });
        return sol
},
eskalieren: (Turmid = 0,add = undefined) => {
    tuerme = [];
    for (var i = 0; i < map.length; i++)
        for ( var j = 0; j< map[0].length; j++)
            tuerme.push(new Turm(j, i, Turmid, tuerme.length,add));
    for(var i = 0; i<5;i++){
        stats.upgradeAll();
    }
},
toWelle: (welle)=>{
    teilWellenNummer = stats.getTeilWellenNummer(welle);
    WellenNummer = welle;
},
true_towers: (Turmid = 0, overStones = false,add = undefined) => {
    tuerme = [];
    for (var i = 0; i < map.length; i++)
        for ( var j = 0; j< map[0].length; j++)
        {
            if(overStones)
                if(map[i][j][0] == 0 || map[i][j][0] == -1)
                    tuerme.push(new Turm(j, i, Turmid, tuerme.length,add));
            if(!overStones)
                if(map[i][j][0] == 0)
                    tuerme.push(new Turm(j, i, Turmid, tuerme.length,add));
            }
    for(var i = 0; i<5;i++){
        stats.upgradeAll();
    }
},
alltowers: (check = true, overStones = false) =>{

    if(check){
        stats.true_towers(0,overStones);
        stats.true_towers(1,overStones);
        stats.true_towers(2,overStones);
        stats.true_towers(3,overStones);
        stats.true_towers(4,overStones);
        stats.true_towers(5,overStones);
        stats.true_towers(6,overStones);
        stats.true_towers(7,overStones);
        stats.true_towers(8,overStones);
        stats.true_towers(9,overStones,0);
        stats.true_towers(9,overStones,1);
        stats.true_towers(9,overStones,2);
        stats.true_towers(9,overStones,3);
        stats.true_towers(10,overStones);
    }
    else{
        
            stats.eskalieren(0);
            stats.eskalieren(1);
            stats.eskalieren(2);
            stats.eskalieren(3);
            stats.eskalieren(4);
            stats.eskalieren(5);
            stats.eskalieren(6);
            stats.eskalieren(7);
            stats.eskalieren(8);
            stats.eskalieren(9,0);
            stats.eskalieren(9,1);
            stats.eskalieren(9,2);
            stats.eskalieren(9,3);
            stats.eskalieren(10);
        
    }
}

}
