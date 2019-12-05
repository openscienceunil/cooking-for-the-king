class PlayScene extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    create ()
    {
        // Declarations of images (decoration only)
        this.background = this.add.image(300, 400, 'background');

        // Creation of the progress bars
        let heatBar = this.createProgressbar(300, 50);
        let moistBar = this.createProgressbar(300, 80);

        // Declarations of sprites (for physics)

        this.shelf = this.physics.add.sprite(100, 550, 'shelf');
        this.cauldron = this.physics.add.sprite(450, 725, 'cauldron');
        this.cauldron.body.setSize(200, 20);
        this.cauldron.body.setOffset(60, 50);


        this.leek = this.physics.add.sprite(100, 200, 'leek').setInteractive();

        //Add physics for all foods
        // Put sprite names in game
        this.foods = this.physics.add.group({
            key: 'foods',
            frame: ["leek.png","bread.png"],
            frameQuantity: 2,
            collideWorldBounds : true
        });


        Phaser.Actions.Call(this.foods.getChildren(), function(food) {
            food.setInteractive({
                draggable: true
            });
        }, this);

        Phaser.Actions.GridAlign(this.foods.getChildren(), {
            width: 10,
            height: 10,
            cellWidth: 32,
            cellHeight: 32,
            x: 100,
            y: 550
        });

        this.dragFood(this.foods);

        this.physics.add.overlap(this.foods, this.cauldron, this.cauldronTouch, null, this);

    }

    update() {
    }

    dragFood() {
        this.input.on('drag', function(pointer, food, dragX, dragY){
            food.x = dragX;
            food.y = dragY;
        })

        this.input.on('dragend', function(pointer, food){
        if(food.x < config.width/2) {
            return;

            // food.input.dragStartX vs food.x
        } else {
            food.setGravity(0, 4000);
        }
        });

        
    }

    cauldronTouch(cauldron, food) {
        food.disableBody(true, true);
        // add to the dish
        // write in the recipe
        // move gauges
    }

    createProgressbar (x, y)
    {
        // size & position
        let width = 200;
        let height = 15;
        let xStart = x - width / 2;
        let yStart = y - height / 2;

        // border size
        let borderOffset = 2;

        let borderRect = new Phaser.Geom.Rectangle(
            xStart - borderOffset,
            yStart - borderOffset,
            width + borderOffset * 2,
            height + borderOffset * 2);

        let border = this.add.graphics({
            lineStyle: {
                width: 2,
                color: 0x000000
            }
        });
        border.strokeRectShape(borderRect);

        // test to see filled bar
        let progressbar = this.add.graphics();
        progressbar.fillStyle(0xffffff, 1);
        progressbar.fillRect(xStart, yStart, 0.5 * width, height);

        /** Need to link the food data in the cauldron to
         * Update the progress bar.
         * 
         * @param {number} percentage 
         */
        /*let updateProgressbar = function (percentage)
        {
            progressbar.clear();
            progressbar.fillStyle(0xffffff, 1);
            progressbar.fillRect(xStart, yStart, percentage * width, height);
        };

        this.load.on('progress', updateProgressbar);

        this.load.once('complete', function ()
        {

            this.load.off('progress', updateProgressbar);
            this.scene.start('title');

        }, this); */
    }
}


// Get data
// let data = this.cache.json.get('foodData');

// Set data to a sprite
// gameObject.setData();
// https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Sprite.html#setData__anchor

