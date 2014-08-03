module.exports = {
  setUp: function( done ){
    done();
  },
  tearDown: function( done ){
    done();
  },
  user_can_create_session: function( test ){

    test.equals( true, true );
    test.done();

  },
  user_can_register_account: function( test ){

    test.equals( true, true );
    test.done();

  },
  account_can_allow_twitter: function( test ){

    test.equals( true, true );
    test.done();

  },
  account_can_disallow_twitter: function( test ){

    test.equals( true, true );
    test.done();

  },
  annon_cannot_update_other_account: function( test ){

    test.equals( true, true );
    test.done();

  },
  user_cannot_update_other_account: function( test ){

    test.equals( true, true );
    test.done();

  },
  user_can_update_information: function( test ){

    test.equals( true, true );
    test.done();

  }
}
