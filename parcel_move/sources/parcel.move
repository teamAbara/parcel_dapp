module parcel_package_addr::parcel {
    use sui::transfer;
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    // use sui::table::{Self, Table};
    use std::string::{Self,String};
    use std::vector;
    

    /*Parcel progress*/  
    const COLLECTING_TREATMENT :u64= 1;
    const TRUNK_VEHICLES:u64= 2;
    const GETTING_OFF_THE_TRUNK_LINE:u64= 3;
    const DELIVERY_RELEASE:u64= 4;
    const DELIVERY_COMPLETED:u64= 5;
    /*ReturnParcel progress*/  
    const COLLECTION_COMPLETE:u64= 1;
    const UNDER_REVIEW:u64= 2;
    const RETURN_COMPLETE:u64= 3;
    //ParcelList
    struct ParcelList has key {
        id:UID,
        parcel_list:vector<Parcel>,
        return_parcel_list:vector<ReturnParcel>,
        parcel_counter:u64,    
        return_parcel_counter:u64,    
     }
     //parcel
      struct Parcel has store,drop,copy{
        id:u64,
        from_address:address,
        to_address:address,
        worker_address:address,
        url:String,
        progress: u64,
     }
      struct ReturnParcel has store,drop,copy{
        id:u64,
        from_address:address,
        to_address:address,
        worker_address:address,
        url:String,
        progress: u64,
     }

    //init : contract init
    fun init(ctx: &mut TxContext) {
        let parcel = vector::empty();
        let return_parcel = vector::empty();
         transfer::share_object(ParcelList {
            id: object::new(ctx),
            parcel_list:parcel,
            return_parcel_list:return_parcel,
            parcel_counter:0,
            return_parcel_counter:0,
        })
    }
  //parcel  reservation
   public entry fun parcel_reservation(parcel_list:&mut ParcelList,from_address:address,to_address:address,worker_address:address,url:vector<u8>) {
    parcel_list.parcel_counter= parcel_list.parcel_counter     +1;   
    vector::push_back(&mut parcel_list.parcel_list,Parcel { 
      id: parcel_list.parcel_counter , 
      from_address:from_address,
      to_address,
      worker_address,
      url:string::utf8(url),
      progress:COLLECTING_TREATMENT,
      });
    }
    public entry fun return_parcel_reservation(parcel_list:&mut ParcelList,from_address:address,to_address:address,worker_address:address,url:vector<u8>) {
    parcel_list.return_parcel_counter= parcel_list.return_parcel_counter+1;   
    vector::push_back(&mut parcel_list.parcel_list,Parcel { 
      id: parcel_list.return_parcel_counter , 
      from_address:from_address,
      to_address,
      worker_address,
      url:string::utf8(url),
      progress:COLLECTION_COMPLETE,
      });
    }

    //Take courier to the next level
    public entry fun next_parcel_progress(parcel_list:&mut ParcelList,id:u64){
      let parcel_list= vector::borrow_mut(&mut parcel_list.parcel_list, id - 1 );
      assert!(parcel_list.progress != DELIVERY_COMPLETED,0);
      parcel_list.progress = parcel_list.progress+1;
    }

    public entry fun next_return_parcel_progress(parcel_list:&mut ParcelList,id:u64){
      let return_parcel_list= vector::borrow_mut(&mut parcel_list.return_parcel_list, id - 1 );
      assert!(return_parcel_list.progress != RETURN_COMPLETE,0);
      return_parcel_list.progress = return_parcel_list.progress+1;
    }


    public fun get_return_parcel_list(parcel: &ParcelList,id:u64): &ReturnParcel{

     vector::borrow(&parcel.return_parcel_list, id - 1 )
      
    }
    public fun get_parcel_list(parcel: &ParcelList,id:u64): &Parcel{

     vector::borrow(&parcel.parcel_list, id - 1 )
      
    }

#[test]
    fun test_parcel() {
        use sui::test_scenario;
        let user1 = @0xA1;

        let scenario_val = test_scenario::begin(user1);
        let scenario = &mut scenario_val;
        {
            init(test_scenario::ctx(scenario));
        };
        test_scenario::next_tx(scenario, user1);
        {
            let parcel_list_val = test_scenario::take_shared<ParcelList>(scenario);
            let parcel_list = &mut parcel_list_val;
      
            parcel_reservation(parcel_list,user1,user1,user1,(b"eil"));
            parcel_reservation(parcel_list,user1,user1,user1,(b"eil"));
            parcel_reservation(parcel_list,user1,user1,user1,(b"eil"));
            assert!(vector::length(&parcel_list.parcel_list)== 3, 0);
            assert!(get_parcel_list(parcel_list,3) == &Parcel{id:3,from_address:user1,to_address:user1,worker_address:user1,url:string::utf8(b"eil"),progress:1}, 0);
            parcel_reservation(parcel_list,user1,user1,user1,(b"eil"));
            assert!(vector::length(&parcel_list.parcel_list)== 4, 0);
            assert!(get_parcel_list(parcel_list,4) == &Parcel{id:4,from_address:user1,to_address:user1,worker_address:user1,url:string::utf8(b"eil"),progress:1}, 0);

            next_parcel_progress(parcel_list,1);
            assert!(get_parcel_list(parcel_list,1) == &Parcel{id:1,from_address:user1,to_address:user1,worker_address:user1,url:string::utf8(b"eil"),progress:2}, 0);

            test_scenario::return_shared(parcel_list_val);
        };
        test_scenario::end(scenario_val);
      }
}
