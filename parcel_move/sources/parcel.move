module parcel_package_addr::parcel {
    use sui::transfer;
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::table::{Self, Table};
    use std::string::{Self,String};
    

    /*Parcel progress*/  
    const COLLECTING_TREATMENT :u64= 1;
    const TRUNK_VEHICLES:u64= 2;
    const GETTING_OFF_THE_TRUNK_LINE:u64= 3;
    const DELIVERY_RELEASE:u64= 4;
    const DELIVERY_COMPLETED:u64= 5;
    /*ReturnParcel progress*/  
    const RETURN_COLLECTING_TREATMENT :u64= 1;
    const RETURN_TRUNK_VEHICLES:u64= 2;
    const RETURN_GETTING_OFF_THE_TRUNK_LINE:u64= 3;
    const RETURN_DELIVERY_RELEASE:u64= 4;
    const RETURN_DELIVERY_COMPLETED:u64= 5;
    //ParcelList
    struct ParcelList has key {
        id:UID,
        parcel_list:Table<u64,Parcel>,
        return_parcel_list:Table<u64,ReturnParcel>,
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
     //return parcel
     struct ReturnParcel has store,drop,copy {
        id:u64,
        from_address:address,
        to_address:address,
        worker_address:address,
        url:String,
        progress: u64,
     }
    //init : contract init
    fun init(ctx: &mut TxContext) {
        let parcel = table::new<u64, Parcel>(ctx);
        let return_parcel = table::new<u64, ReturnParcel>(ctx);
         transfer::share_object(ParcelList {
            id: object::new(ctx),
            parcel_list:parcel,
            return_parcel_list:return_parcel,
            parcel_counter:0,
            return_parcel_counter:0,
        })
    }
  //parcel  reservation
   public entry fun parcel_reservation(parcel_list:&mut ParcelList,from_address:address,to_address:address,worker_address:address,url:String) {
    let parcel_id :u64=parcel_list.parcel_counter;
    table::add(&mut parcel_list.parcel_list, parcel_id+1, 
    Parcel { 
      id: parcel_id + 1, 
      from_address:from_address,
      to_address,
      worker_address,
      url,
      progress:COLLECTING_TREATMENT
      });
    }
     
    //return parcel  reservation

    public entry fun return_parcel_reservation(parcel_list:&mut ParcelList,from_address:address,to_address:address,worker_address:address,url:String) {
    let return_parcel_id :u64=parcel_list.return_parcel_counter;
    table::add(&mut parcel_list.return_parcel_list, return_parcel_id+1, 
    ReturnParcel { 
      id: return_parcel_id + 1, 
      from_address:from_address,
      to_address,
      worker_address,
      url,
      progress:COLLECTING_TREATMENT
      });
    }
    //Take courier to the next level
    public entry fun next_parcel_progress(parcel_list:&mut ParcelList,id:u64){
      let parcel_list= table::borrow_mut(&mut parcel_list.parcel_list, id);
      assert!(parcel_list.progress != DELIVERY_COMPLETED,0);
      parcel_list.progress = parcel_list.progress+1;
    }
   //Take courier to the next level
    public entry fun next_return_parcel_progress(return_parcel_list:&mut ParcelList,id:u64){
      let return_parcel_list= table::borrow_mut(&mut return_parcel_list.return_parcel_list, id);
      return_parcel_list.progress = return_parcel_list.progress+1;
    }


    
    public fun get_parcel_list(coin: &ParcelList,id:u64): Parcel{
       Parcel{
             id:table::borrow(&coin.parcel_list, id).id,
             from_address:table::borrow(&coin.parcel_list, id).from_address,
             to_address:table::borrow(&coin.parcel_list, id).to_address,
             worker_address:table::borrow(&coin.parcel_list, id).worker_address,
             url:table::borrow(&coin.parcel_list, id).url,
             progress:table::borrow(&coin.parcel_list, id).progress,
        }
    }
      public fun get_return_parcel_list(coin: &ParcelList,id:u64): ReturnParcel{
       ReturnParcel{
             id:table::borrow(&coin.return_parcel_list, id).id,
             from_address:table::borrow(&coin.return_parcel_list, id).from_address,
             to_address:table::borrow(&coin.return_parcel_list, id).to_address,
             worker_address:table::borrow(&coin.return_parcel_list, id).worker_address,
             url:table::borrow(&coin.return_parcel_list, id).url,
             progress:table::borrow(&coin.return_parcel_list, id).progress,
        }
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
            parcel_reservation(parcel_list,user1,user1,user1,string::utf8(b"eil"));

            assert!(get_parcel_list(parcel_list,1) == Parcel{id:1,from_address:user1,to_address:user1,worker_address:user1,url:string::utf8(b"eil"),progress:1}, 0);
            next_parcel_progress(parcel_list,1);
            assert!(get_parcel_list(parcel_list,1) == Parcel{id:1,from_address:user1,to_address:user1,worker_address:user1,url:string::utf8(b"eil"),progress:2}, 0);
            return_parcel_reservation(parcel_list,user1,user1,user1,string::utf8(b"eil"));
            assert!(get_return_parcel_list(parcel_list,1) == ReturnParcel{id:1,from_address:user1,to_address:user1,worker_address:user1,url:string::utf8(b"eil"),progress:1}, 0);
            next_return_parcel_progress(parcel_list,1);
            assert!(get_return_parcel_list(parcel_list,1) == ReturnParcel{id:1,from_address:user1,to_address:user1,worker_address:user1,url:string::utf8(b"eil"),progress:2}, 0);

            test_scenario::return_shared(parcel_list_val);
        };
        test_scenario::end(scenario_val);
      }
}
