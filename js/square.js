Square = new Class({

    initialize: function(){
        this.Fx = {
            transition: Fx.Transitions.Linear,
            duration: Game.tweenDuration
        };
        this.createElement();
    },

    createElement: function(){
        var size = {x:50, y:50};
        var _left = (Math.random() * (window.getSize().x - size.x)).toInt();
        var num = String((Math.random() * 10).toInt());

        this.el = new Element('div', {
            'class': 'square',
            'text': num,
            'styles': {
                'left': _left
            },
            'tween': this.Fx
        });

        this.el.store('instance', this);

        var endTop = window.getSize().y;

        this.el.inject($$('body')[0]);
        this.el.tween('top', endTop).get('tween').chain(function(){
            this.el.dispose();
            if (Game.running){
                Game.loseLife();
                Game.brokenSquares++;
            }
        }.bind(this));
    },

    explode: function(){
        this.el.get('tween').cancel();
        var _top = this.el.getStyle('top').toInt() - 75;
        var _left = this.el.getStyle('left').toInt() - 75;
        this.el.set('morph', {
            'duration': 100,
            'transition': Fx.Transitions.Linear
        });
        this.el.morph({
            'width': 200,
            'height': 200,
            'top': _top,
            'left': _left,
            'line-height': 200,
            'opacity': 0
        }).get('morph').chain(function(){
            this.el.dispose();
        }.bind(this));
    }

});
