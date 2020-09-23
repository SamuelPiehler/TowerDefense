
var lebenMult = 1;
var gegnerWellen = [
  //liste aller teilwellen
  //0 = Gegnertyp, 1 = Lebenmult, 2 = Anzahl, 3 = ZeitZwischenGegnern, 4 = ZeitBisZurNächstenTeilwelle(-1 für WellenEnde)
  // 1
  [0,  lebenMult, 10, 1.6, -1], //10 Gold
  // 2
  [0,  lebenMult, 12, 1, -1], // 12 Gold
  // 3
  [0,  lebenMult, 15 , 1 , -1], // 15 Gold
  // 4
  [1,  lebenMult, 8, 1, -1], //  16 Gold
  // 5
  [0,  lebenMult, 30 , 0.7, -1],   // 30 Gold
  // 6
  [0,  lebenMult, 18, 0.5, 3.25], // 18 Gold
  [2,  lebenMult, 3, 1, -1],    // 12 Gold
  // 7
  [1,  lebenMult, 12, 0.7, 3], //  24 Gold
  [2,  lebenMult  , 5, 1, -1], //  20 Gold
  // 8
  [0,  lebenMult, 20, 0.3, 1], // 20 Gold
  [3,  lebenMult, 5, 1.5, 0.5], //20 Gold
  [1,  lebenMult, 10, 1, -1],// 20 Gold
  // 9
  [2,  lebenMult, 8, 1, 2], //  48 Gold
  [3,  lebenMult, 7, 1, -1],//  28 Gold
  // 10
  [0,  lebenMult , 20, 0.4, 0.2], // 10 Gold
  [1,  lebenMult , 15, 0.4, 3.1], // 30 Gold
  [6,  lebenMult , 2, 1,-1], // 50 Gold
  // 11
  [10, lebenMult += 0.2, 4, 0.5, 11],  // 60 Gold
  [3,  lebenMult, 10, 0.2, 0.3], // 40 Gold
  [0,  lebenMult, 20, 0.4, 0.1], // 20 Gold
  [1,  lebenMult, 10, 0.8, -1],  // 20 Gold
  // 12
  [2,  lebenMult +=0.5, 10, 3, 1],      //  60 Gold
  [0,  lebenMult, 10, 0.2, 0.1], //  10 Gold
  [1,  lebenMult, 10, 0.6, -1], //  20 Gold

  // 13
  [3,  lebenMult +=0.5, 8, 2, 3],    //32  Gold
  [2,  lebenMult, 10, 1, 0.5], // 60 Gold
  [1,  lebenMult, 20, 1, -1], // 40 Gold
  // 14
  [4,  lebenMult, 9, 3, 1],  //  72 Gold
  [3,  lebenMult, 4, 3, 0.5], // 16  Gold
  [2,  lebenMult, 4, 3, 0.5], // 24 Gold
  [1,  lebenMult, 10, 5, -1], //  20 Gold
  // 15
  [5,  lebenMult, 13, 0.8, 1],  // 65 Gold
  [4,  lebenMult, 8, 3, 0.6], //  64 Gold
  [6,  lebenMult, 5, 3 , 0.5], // 125 Gold
  [7,  lebenMult, 1, 0.5, -1], //  20 Gold
  // 16
  [5,  lebenMult +=0.5, 10, 0.5, 0.25], //  50 Gold
  [3,  lebenMult, 10, 0.5, 0.25],// 40 Gold
  [0,  lebenMult, 20, 0.25, 0.5],// 20 Gold
  [2,  lebenMult, 10 ,0.6, -1],//  60 Gold
  // 17
  [0,  lebenMult, 7, 4, 0.1], // 7 Gold
  [1,  lebenMult, 7, 3, 0.9], // 14 Gold
  [2,  lebenMult, 7, 2., 0.8], // 56 Gold
  [3,  lebenMult, 7, 1, 1.5], // 28 Gold
  [5,  lebenMult, 7, 2.2, 0.1], // 35 Gold
  [4,  lebenMult, 7, 1.2, -1], // 56 Gold
  // 18
  [0,  lebenMult +=0.5, 7, 0.1, 5],  // 7  Gold
  [1,  lebenMult, 7, 0.1, 5], // 14 Gold
  [2,  lebenMult, 7, 0.1, 5], // 54 Gold
  [3,  lebenMult, 7, 0.1, 5], //28 Gold
  [5,  lebenMult, 7, 0.1, 5], // 35 Gold
  [4,  lebenMult, 7, 0.1, -1], // 56 Gold
  // 19
  [4,  lebenMult +=0.5, 15, 0.7, 5], // 120 Gold
  [1,  lebenMult, 2, 0.8, 1], // 60 Gold
  [3,  lebenMult, 15, 0.7, -1], // 52 Gold
  // 20
  [15, lebenMult, 3, 15, 5],  //  150 Gold
  [4,  lebenMult, 10, 0.7, 0.5], // 80 Gold
  [3,  lebenMult, 10, 0.7, 4], //  40 Gold
  [5,  lebenMult, 4, 10, 2], //  20 Gold
  [10, lebenMult, 2, 2 , 5], // 12 Gold
  [8,  lebenMult, 1 , 0.5 ,-1], // 10 Gold
  //21
  [12,  lebenMult, 5, 0.5, 2], // 70 Gold
  [11,  lebenMult, 5, 1, 0.5], // 5 Gold
  [3,  lebenMult, 9, 0.5, 4], // 36 Gold
  [2,  lebenMult, 9, 0.5, -1], // 54 Gold
  //22
  [0,  lebenMult, 10, 0.5, 2], // 10 Gold
  [3,  lebenMult, 20, 0.6, 3], //80  Gold
  [5,  lebenMult, 15, 0.2, -1], // 75 Gold
  //23
  [2,  lebenMult, 20,  1, 1], // 120 Gold
  [1,  lebenMult, 15,  1, 0.5], // 30  Gold
  [4,  lebenMult, 10, 0.4, 4], //80 Gold
  [5,  lebenMult, 8,  0.2, -1], // 40 Gold
  //24
  [0,  lebenMult +=0.5, 20, 1, 1], // 20 Gold
  [4,  lebenMult, 10, 1, 0.5], // 80 Gold
  [3,  lebenMult, 10, 0.5, -1], // 40 Gold
  //25
  [6,  lebenMult, 3, 0.5, 2], //  75 Gold
  [0,  lebenMult, 20,  0.2, 0.5], // 20 Gold
  [15, lebenMult, 3, 1.5, -1], // 75 Gold
  //26
  [3,  lebenMult +=0.5, 20, 0.5, 1], // 80 Gold
  [5,  lebenMult, 10, 0.2, 1,5], // 50 Gold
  [4,  lebenMult,  5, 1, -1], // 40 Gold
  //27
  [1,  lebenMult +=0.5, 30, 0.5, 1],  // 60 Gold
  [2,  lebenMult,  20, 0.6, 2], // 120 Gold
  [3,  lebenMult,  20, 0.4, -1], // 80 Gold
  //28
  [0,  lebenMult,  30, 0.2, 1], // 30 Gold
  [5,  lebenMult,  20, 0.5, 6], // 100 gold
  [2,  lebenMult, 10, 0.1, 2], // 60 Gold
  [4,  lebenMult, 10 ,1 ,-1 ], //  80 Gold
  //29
  [4,  lebenMult, 20, 1, 1], // 160 Gold
  [3,  lebenMult, 30, 0.4, 2], // 120 Gold
  [1,  lebenMult, 20, 0.5, 0.5], // 40 Gold
  [6,  lebenMult,  2, 0.5, -1], // 50 Gold
  //30
  [6,  lebenMult, 5, 1.5, 2],  // 125 Gold
  [5,  lebenMult, 10, 1 , 0.5], // 50 Gold
  [4,  lebenMult, 15, 0.5, 0.5], // 120 Gold
  [6,  lebenMult, 5 , 2, 3], // 125 Gold
  [2,  lebenMult, 20, 0.5 ,-1], // 125 Gold
  //31
  [7,  lebenMult +=0.5, 8, 1.5, 3], // 200 Gold
  [8,  lebenMult, 5, 2, 6], // 50  Gold
  [10, lebenMult, 5, 0.5, 5], // 60 Gold
  [14, lebenMult, 8, 2, -1], // 200 Gold
  //32
  [9,  lebenMult, 10, 2, 3], //150 Gold
  [11, lebenMult, 10, 3, 1], // 10 Gold
  [12, lebenMult, 10, 1, 4], // 140 Gold
  [13, lebenMult, 10, 1, -1], // 200 Gold
  //33
  [5,  lebenMult +=0.5, 10, 1, 0.5], // 50 Gold
  [10, lebenMult, 10, 2, 1], // 120 Gold
  [12, lebenMult, 10, 0.4, 2], // 140 Gold
  [9,  lebenMult, 10, 0.7, -1], //  150 Gold
  //34
  [10, lebenMult, 10, 2 , 2], // 120 Gold
  [8,  lebenMult ,5, 1.5, 0.5], // 50 Gold
  [4,  lebenMult, 18, 0.9, 3], // 144 Gold
  [3,  lebenMult, 15, 1, 3.5], //60 Gold
  [1,  lebenMult, 20, 2, -1], // 40 Gold
  //35
  [10, lebenMult +=0.5, 10, 2, 1],  //  150 Gold
  [12, lebenMult, 10, 1, 1.5], //100 Gold
  [13, lebenMult, 8, 2, 0.5], // 80 Gold
  [15, lebenMult, 4, 3, 2.5], // 120  Gold
  [16, lebenMult, 1, 3, -1], // 70 Gold
  //36
  [1,  lebenMult +=0.5, 20, 0.2, 4], // 40 Gold
  [10, lebenMult, 12, 2, 1], // 144 Gold
  [11, lebenMult, 13, 1, 1.5], // 13 Gold
  [12, lebenMult, 15, 2, 0.5], // 210 Gold
  [13, lebenMult, 5, 1, 2.5], // 100 Gold
  [14, lebenMult, 5, 0.2, -1], //  100 Gold
  //37
<<<<<<< HEAD
  [0,  lebenMult +=0.5, 12, 1, 1],  // 12 Gold
=======
  [0,  lebenMult +=1,0, 12, 1, 1],  // 12 Gold
>>>>>>> f7f58e7f5aa0fc92bbb5546283734714fa4311ba
  [7,  lebenMult, 7, 2, 0.5], // 140 Gold
  [3,  lebenMult, 10, 3, 1.2], // 40 Gold
  [5,  lebenMult, 12, 2, 1.5], // 65 Gold
  [11, lebenMult, 12, 2, 1], // 12 Gold
  [12, lebenMult, 10, 1, 1.5], //  140 Gold
  [13, lebenMult, 10, 2, -1], //200  Gold
  //38
<<<<<<< HEAD
  [3,  lebenMult +=0.5, 12, 2, 1], // 48 Gold
=======
  [3,  lebenMult +=1,0, 12, 2, 1], // 48 Gold
>>>>>>> f7f58e7f5aa0fc92bbb5546283734714fa4311ba
  [5,  lebenMult, 13, 1, 1.5], // 65  Gold
  [8,  lebenMult, 15, 2, 0.5], // 150 Gold
  [9,  lebenMult, 5, 4, 2.5], // 75 Gold
  [14, lebenMult, 5, 4, -1],// 100 Gold
  //39
  [10,  lebenMult, 12, 2, 0], // 120 Gold
  [4,   lebenMult, 20, 0.5, 0],// 160 Gold
  [14,  lebenMult, 15, 2, 5],//  300 Gold
  [13,  lebenMult, 5, 3, 0],//  100 Gold
  [12,  lebenMult, 5, 3, -1],//  70 Gold
  //40
  [2,   lebenMult +=0.5, 15, 1, 2], //30 Gold
  [4,   lebenMult, 15, 0.5, 2.5],// 120 Gold
  [6,   lebenMult, 15, 0.5, 1.7],// 375 Gold
  [8,   lebenMult, 15, 0.5, 1.9],// 150 Gold
  [10,  lebenMult, 15, 0.5, 0.7],//  180 Gold
  [12,  lebenMult, 15, 0.5, 0.7],// 210 Gold
  [12,  lebenMult, 15, 2, 0],//  210 Gold
  [13,  lebenMult, 5, 3, 0],//  100 Gold
  [14,  lebenMult, 5, 1, 0],// 100 Gold
  [15,  lebenMult, 5, 2.5, 0],// 150 Gold
  [16,  lebenMult, 2, 2, 0],//  175 Gold
  [12,  lebenMult, 5, 3, -1],// 70 Gold
  //41
  [14,  lebenMult, 3, 0.5, 1], //45 Gold
  [2,   lebenMult, 11, 1.5, 2], //33 Gold
  [10,  lebenMult, 7, 0.5, 1], // 105 Gold
  [4,   lebenMult, 9, 1.5, 2], // 45 Gold
  [7,   lebenMult, 6, 0.5, 1], // 30 Gold
  [1,   lebenMult, 15, 1.5, -1], // 30 Gold
  //42
  [7,   lebenMult, 7, 2, 1 ], // 35  Gold
  [9,   lebenMult, 13, 0.6, 2], //195 Gold
  [2,   lebenMult, 15, 3, 1.2], //45 Gold
  [4,   lebenMult, 14, 1, 1.5], //70 Gold
  [8,   lebenMult, 11, 2,  2], //110 Gold
  [10,  lebenMult, 9, 4, 2], //135 Gold
  [13,  lebenMult, 11, 0.3, 2], //110 Gold
  [3,   lebenMult, 17, 0.5, -1], //85 Gold
  //43
  [14,  lebenMult, 4, 0.8, 1], //60 Gold
  [7,   lebenMult,  9, 1.5, 0.5], //45 Gold
  [3,   lebenMult, 20, 0.9, 2.5], //80 Gold
  [2,   lebenMult,  9, 0.5, 1.4], //27 Gold
  [10,  lebenMult, 5, 0.7, 2.8], //75 Gold
  [4,   lebenMult, 12, 3, 3], //60 Gold
  [8,   lebenMult, 10, 3.1, 0.8], //100 Gold
  [5,   lebenMult, 15, 2.2,-1], //75 Gold
  //44
  [9 ,  lebenMult ,6 , 0.5 ,0.6 ], // 90 Gold
  [12 , lebenMult ,10 , 0.8 , 0.6 ], // 140 Gold
  [4 ,  lebenMult , 11 , 1.2 , 3 ], // 55 Gold
  [10 , lebenMult ,12  , 1.5 , 2.5 ], // 180 Gold
  [5 ,  lebenMult , 20 , 1.6 ,2 ], //  100 Gold
  [8 ,  lebenMult , 10 , 2 , 1.2 ], // 100  Gold
  [1 ,  lebenMult , 14 , 2.3 , 1 ], // 28 Gold
  [3 ,  lebenMult ,20 , 2.4 , -1 ], // 80 Gold
  //45
  [6,   lebenMult, 15, 1 , 1], //  300 Gold
  [15,  lebenMult, 15, 1.5 ,1.2 ], // 450 Gold
  [16,  lebenMult, 2, 2 , 1.3 ], // 525 Gold
  [13,  lebenMult, 15, 2.5 , 1.5 ], // 150 Gold
  [8,   lebenMult, 15,  1,  1.6], //  150 Gold
  [9,   lebenMult, 15,  1,  -1], // 225 Gold
  //46
  [5,   lebenMult +=0.5, 17, 0.5, 1],//  85 Gold
  [12,  lebenMult, 23, 0.9, 0.4],// 230 Gold
  [9,   lebenMult, 26, 1, 1.2],// 390 Gold
  [3,   lebenMult, 11, 1.2, 1.5],// 44 Gold
  [0,   lebenMult, 35, 1.5, 2],// 35 Gold
  [10,  lebenMult, 20, 1.7, 1],// 300 Gold
  [14,  lebenMult, 15, 2, -1],// 225 Gold
  //47
  [12,  lebenMult, 21, 1.2, 1], //  210 Gold
  [14,  lebenMult, 8, 1.5, 1.1], // 120 Gold
  [2,   lebenMult, 41, 1.8, 1.3], // 82  Gold
  [5,   lebenMult, 31, 2, 1.6], // 155 Gold
  [4,   lebenMult, 47, 2.2, 1.8], //235  Gold
  [1,   lebenMult, 47, 2.4, 2], // 47 Gold
  [8,   lebenMult, 25, 2.5, -1], // 250  Gold
  //48
  [0,  lebenMult, 37, 1, 1], // 37 Gold
  [10, lebenMult, 15, 0.5, 0.5], //  225 Gold
  [8,  lebenMult, 44, 1, 1.5], // 440 Gold
  [3,  lebenMult, 10, 0.5, 2], // 40 Gold
  [13, lebenMult, 50, 1, 1], // 500  Gold
  [5,  lebenMult, 21, 0.5, -1], // 105 Gold
  //49
  [8,  lebenMult , 49, 2, 1], // 490 Gold
  [13, lebenMult , 30, 2.1, 1.2], //300 Gold
  [0,  lebenMult , 34, 2.5, 1.4 ], //  Gold
  [1,  lebenMult , 47, 1, 1.2], //  Gold
  [9,  lebenMult , 49, 1,  1.1], //  Gold
  [5,  lebenMult , 45, 1, 1], //  Gold
  [3,  lebenMult , 50, 1.2, -1], //  Gold
  //50
  [1, lebenMult +=0.5 , 20, 1, 0.9], // Gold
  [2, lebenMult , 20, 1, 0.9], // Gold
  [3, lebenMult , 20, 1, 0.9], // Gold
  [4, lebenMult , 20, 1, 0.9], // Gold
  [5, lebenMult , 20, 1, 0.9], // Gold
  [6, lebenMult , 20, 1, 0.9], // Gold
  [7, lebenMult , 20, 1, 0.9], // Gold
  [8, lebenMult , 20, 1, 0.9], // Gold
  [9, lebenMult , 20, 1, 0.9], // Gold
  [10, lebenMult , 20, 1, 0.9], // Gold
  [11, lebenMult , 20, 1, 0.9], // Gold
  [12, lebenMult , 20, 1, 0.9], // Gold
  [13, lebenMult , 20, 1, 0.9], // Gold
  [14, lebenMult , 20, 1, 0.9], // Gold
  [15, lebenMult , 10, 1, 0.9], // Gold
  [16, lebenMult , 10, 1, -1], // Gold
  //51
  [13 , lebenMult +=0,5 , 30, 2, 0.5 ],
  [10 , lebenMult , 30, 2, 0.5 ],
  [5 , lebenMult , 30, 2, 0.5 ],
  [9 , lebenMult , 30, 2, 0.5 ],
  [1 , lebenMult , 30, 2, 0.5 ],
  [12 , lebenMult , 30, 2, 0.5 ],
  [2 , lebenMult , 30, 2, 0.5 ],
  [9 , lebenMult , 30, 2, 0.5 ],
  [13, lebenMult , 30, 2, 0.5 ],
  [1 , lebenMult , 30, 2, 0.5 ],
  [4 , lebenMult , 30, 2, 0.5 ],
  [10 , lebenMult , 30, 2, 0.5 ],
  [1 , lebenMult , 30, 2, 0.5 ],
  [8 , lebenMult , 30, 2, -1],  // Gold
  //52
  [14, lebenMult ,1,  1, -1]
  [5,  lebenMult ,29, 0.5, 2],
  [2,  lebenMult ,24, 1 , 1],
  [9, lebenMult  ,11, 1, 1],
  [12,lebenMult  ,55, 1.5,1],
  [3 ,lebenMult  ,28, 1, 1,5],
  [2 ,lebenMult  ,40, 1.5 ,1],
  [8 ,lebenMult  ,45 , 2, 1],
  [6 ,lebenMult  ,15 , 2,  1],
  [7 , lebenMult ,36 , 2 , -1],
  //53,
  [0, lebenMult , 1, 1, 1],
  [3, lebenMult ,21 ,2, 1],
  [8, lebenMult ,38 ,1 ,0.5],
  [9, lebenMult, 58 ,1.5, 0.2],
  [4, lebenMult, 52 , 1 , 0.5],
  [10,lebenMult ,50 , 1 , 1.5],
  [3,lebenMult ,22,   1 , 0.5],
  [5, lebenMult ,54,  2 , 0.9],
  [14, lebenMult ,13, 2 , 0.7],
  [7 ,lebenMult , 52,  2 , 0.5],
  [1 ,lebenMult ,28 , 2 , 0.2],
  [13 ,lebenMult ,14, 2 ,-1],
  //54
  [0, lebenMult , 1, 1, 1],
  [10, lebenMult ,6,2, 1, 2.5],
  [2, lebenMult,21, 2,2.5],
  [1, lebenMult,13, 2,2.5],
  [15, lebenMult,37,2,2.5],
  [9, lebenMult,28,2,0.2],
  [5, lebenMult,18,2,0.5],
  [7, lebenMult,47,2,0.5],
  [8, lebenMult, 26,2,0.5],
  [4, lebenMult,44,2,0.5],
  [13, lebenMult,57,1,-1],
   // Gold
  //55
  [0, lebenMult , 1, 1, -1], // Gold
  //56
  [0, lebenMult , 1, 1, -1], // Gold
  //57
  [0, lebenMult , 1, 1, -1], // Gold
  //58
  [0, lebenMult , 1, 1, -1], // Gold
  //59
  [0, lebenMult , 1, 1, -1], // Gold
  //60
  [0, lebenMult , 1, 1, -1] // Gold
];
