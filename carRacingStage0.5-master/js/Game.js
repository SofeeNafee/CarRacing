class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef=await database.ref('playerCount').once("value");
      player.getCount();
      form = new Form()
      form.display();
    }
  }
  play(){
    form.hide();
    textSize(30);
    text("Game Started",120,100);
    Player.getplayerinfo();
    if(allplayers!=undefined){
      var displayposition=130;
      for(var p in allplayers){
        if(p=="player"+player.Index){fill ("cyan")}
        else{fill("black")}
        displayposition+=20;
        textSize(15);
        text(allplayers[p].name+": "+allplayers[p].distance,120,displayposition);
      }
    }
    if(keyDown(UP_ARROW) && player.Index!=null){
      player.distance+=50;
      player.update();
    }
  }
}
