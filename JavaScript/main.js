
/*let answer =1;
switch(answer){
    case 1:
        console.log("javascript");
        break;
        case 2:
            console.log("python");
            break;
            default: 
            console.log("ne brat");
}

let count =0;
while(count<10){
console.log(count);
count++;

}

let count=0;
do{
    console.log("count is "+ count);
    count++;
}
while(count<=5); 
for(let count=0;count<5;count++)

    console.log(count);
    
for(let i=1;i<4;i++){
    for(let k=0;k<4;k++){
    console.log(i+"+"+k);
}
console.log(/n);
}  

const obj={a:1,b:5,c:3};
for(let o in obj)
{
    console.log(obj[o]);
}

let x=10, str = '10';
console.log(x==str); 
console.log(x===str);
console.log(x===Number(str));
console.log(x!==Number(str));

/// && i dvete sa verni
// || ili operator
// !x invert(obrushta stoinosta ) -- x= true ; !x - stava false :)


let x=5;
j=x=40;
console.log(x,j); 
let x=5,y=10;
x=x+y;      
x +=y;  //i dvata reda sa ednakvi      // assigment 
console.log(x);
x -=y; izvajdane
x /=y;
x *=y;
  // x/y=0;  gornite  redove pravqt tova 
  x<<=y;
  x<<=y;


// nadolu pochva typeoff operator
// undefined
//null 
//boolen
//number
//string
//symbol
//object

console.log(typeof 1); // vurshta v konzolata number
console.log(typeof "number"); // string
console.log(typeof true); // boolean 
console.log(typeof null); // object - primitive data type - to e 
//expection
/* Comma (,) */
/*let y=40, x=10;  // s zapetaq opredelqme nqkolko variables na edin pyt vmesto red po rred
*/

/*
Destructing asssing operator 
//New in EcmaScript 6
//noermal object declaration
const obj={a:1,b:2,c:3,e:5};
//destructing assignment operator
const{a,b,c,d,e}=obj;
//prisnt variables
console.log(a);
console.log(b);
console.log(c);
console.log(d); // tozi red e undefined zashttoo ne sme mu zadali value
// s tova pravim razpadane na array na  na negovite  variables

const arry=[1,2,3,5,6];
let [a,b, ...rest]=arry; // deklarirame destruction operator za array-q otgore
console.log(a);
console.log(b);
//console.log(c); // - c ne e dekalrirana 
//Spread operator //
console.log(rest);
// vrushta ostanalite nedeklarirani chisla ot array-q //
*/
/*
//operator precedence??//
//example
let x;
x=5+3*2;
console.log(x); // purvo skobi, sled tva umnojenie delenie,
// basic matematika nakratko 
*/
//Array and object operators//

package com.zetcode;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import javax.swing.ImageIcon;
import javax.swing.JPanel;
import javax.swing.Timer;

public class Board extends JPanel implements ActionListener {

    private final int B_WIDTH = 300;
    private final int B_HEIGHT = 300;
    private final int DOT_SIZE = 10;
    private final int ALL_DOTS = 900;
    private final int RAND_POS = 29;
    private final int DELAY = 140;

    private final int x[] = new int[ALL_DOTS];
    private final int y[] = new int[ALL_DOTS];

    private int dots;
    private int apple_x;
    private int apple_y;

    private boolean leftDirection = false;
    private boolean rightDirection = true;
    private boolean upDirection = false;
    private boolean downDirection = false;
    private boolean inGame = true;

    private Timer timer;
    private Image ball;
    private Image apple;
    private Image head;

    public Board() {
        
        initBoard();
    }
    
    private void initBoard() {

        addKeyListener(new TAdapter());
        setBackground(Color.black);
        setFocusable(true);

        setPreferredSize(new Dimension(B_WIDTH, B_HEIGHT));
        loadImages();
        initGame();
    }

    private void loadImages() {

        ImageIcon iid = new ImageIcon("src/resources/dot.png");
        ball = iid.getImage();

        ImageIcon iia = new ImageIcon("src/resources/apple.png");
        apple = iia.getImage();

        ImageIcon iih = new ImageIcon("src/resources/head.png");
        head = iih.getImage();
    }

    private void initGame() {

        dots = 3;

        for (int z = 0; z < dots; z++) {
            x[z] = 50 - z * 10;
            y[z] = 50;
        }
        
        locateApple();

        timer = new Timer(DELAY, this);
        timer.start();
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);

        doDrawing(g);
    }
    
    private void doDrawing(Graphics g) {
        
        if (inGame) {

            g.drawImage(apple, apple_x, apple_y, this);

            for (int z = 0; z < dots; z++) {
                if (z == 0) {
                    g.drawImage(head, x[z], y[z], this);
                } else {
                    g.drawImage(ball, x[z], y[z], this);
                }
            }

            Toolkit.getDefaultToolkit().sync();

        } else {

            gameOver(g);
        }        
    }

    private void gameOver(Graphics g) {
        
        String msg = "Game Over";
        Font small = new Font("Helvetica", Font.BOLD, 14);
        FontMetrics metr = getFontMetrics(small);

        g.setColor(Color.white);
        g.setFont(small);
        g.drawString(msg, (B_WIDTH - metr.stringWidth(msg)) / 2, B_HEIGHT / 2);
    }

    private void checkApple() {

        if ((x[0] == apple_x) && (y[0] == apple_y)) {

            dots++;
            locateApple();
        }
    }

    private void move() {

        for (int z = dots; z > 0; z--) {
            x[z] = x[(z - 1)];
            y[z] = y[(z - 1)];
        }

        if (leftDirection) {
            x[0] -= DOT_SIZE;
        }

        if (rightDirection) {
            x[0] += DOT_SIZE;
        }

        if (upDirection) {
            y[0] -= DOT_SIZE;
        }

        if (downDirection) {
            y[0] += DOT_SIZE;
        }
    }

    private void checkCollision() {

        for (int z = dots; z > 0; z--) {

            if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
                inGame = false;
            }
        }

        if (y[0] >= B_HEIGHT) {
            inGame = false;
        }

        if (y[0] < 0) {
            inGame = false;
        }

        if (x[0] >= B_WIDTH) {
            inGame = false;
        }

        if (x[0] < 0) {
            inGame = false;
        }
        
        if (!inGame) {
            timer.stop();
        }
    }

    private void locateApple() {

        int r = (int) (Math.random() * RAND_POS);
        apple_x = ((r * DOT_SIZE));

        r = (int) (Math.random() * RAND_POS);
        apple_y = ((r * DOT_SIZE));
    }

    @Override
    public void actionPerformed(ActionEvent e) {

        if (inGame) {

            checkApple();
            checkCollision();
            move();
        }

        repaint();
    }

    private class TAdapter extends KeyAdapter {

        @Override
        public void keyPressed(KeyEvent e) {

            int key = e.getKeyCode();

            if ((key == KeyEvent.VK_LEFT) && (!rightDirection)) {
                leftDirection = true;
                upDirection = false;
                downDirection = false;
            }

            if ((key == KeyEvent.VK_RIGHT) && (!leftDirection)) {
                rightDirection = true;
                upDirection = false;
                downDirection = false;
            }

            if ((key == KeyEvent.VK_UP) && (!downDirection)) {
                upDirection = true;
                rightDirection = false;
                leftDirection = false;
            }

            if ((key == KeyEvent.VK_DOWN) && (!upDirection)) {
                downDirection = true;
                rightDirection = false;
                leftDirection = false;
            }
        }
    }
}