$(document).ready(function(){

  $('form').on('submit', function(){
      
      // var item = $('form input');
      // console.log(item.serializeArray());

      $.ajax({
        type: 'POST',
        url: '/search',
        // data: this,
        data: $(this).serializeArray(),
        success: function(data){
          // do something with the data via front-end framework
          console.log(data);
        }
      });

      const requestOptions = {
          method: 'POST',
          body: ''
      };
        fetch(`fallen-api/search`,requestOptions)
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          this.setState({loading: false, list: data.games});
          // this.state.list = data.games;
        });

      return false;
  });

});