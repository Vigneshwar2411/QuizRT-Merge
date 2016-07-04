module.exports = function register(options){

  //load an Users based on id.
    this.add({role:'user',action:'get'},function(msg,respond){
      this.make('users').load$({name:msg.data},respond);
    });
    //create a new user
    this.add({role:'user',action:'add'},function(msg,respond){
      console.log('from add---------------'+msg.data+'------------------');
      this.make('users').data$(msg.data).save$(respond);
      // create a user profile
      this.make('profile_collection').data$({
        totalGames:0,
        wins:0,
        imageLink:"",
        badge:"",
        name:"",
        age:0,
        country:"",
        userId:msg.data.name,
        tournaments:[],
        topicsPlayed:[],
        _v:0,
        likeTopics:[]
      }).save$()

    });


    //update an user
    this.add('role:user,action:update',function(msg,respond){
      this.act('role:user, action:get',{id:msg.id},function(err,loaded_user){
        loaded_user.data$(msg.data).save$(respond);
      })
    });

    //delete an user
    this.add('role:user,action:delete',function(msg,respond){
      this.make('users').remove$(msg.id,respond);
    });
}
