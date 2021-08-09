pragma solidity 0.7.0;

contract Election{
    
    //false: not voted 
    //true: voted
    //model a Candidate
    //struct for Candidates
    
    event Regestering_candidate(uint256 candidate_id,  string name, uint256 total_vote);
    event Voted(uint256 id);
    event Leader(uint256 highest_votes, string name);
    
    
    struct Candidate{
        string name;
        uint256 vote_count;
        uint256 id;
    }
    
    struct Lead{
        string  name;
        uint256 votes;
    }
    
    Lead public the_one;
    
    uint256 public candidates_count;
    
    address public contractOwner;
    
    constructor(){
        contractOwner = msg.sender;
    }
    
    
    
    mapping(uint256 => Candidate)public Candidates;
    mapping(address => bool) public voters;
    mapping(address => bool) public candidate_exist;
    modifier onlyOwner(){
        require(contractOwner == msg.sender, "You are not authorised to proceed");
        _;
        
    }
    
    modifier already_voted(){
        require(voters[msg.sender] ==  false, 'The vote has already been casted');
        _;
    }
    
    modifier candidate_registered(address _add){
        require(candidate_exist[_add] == false, "The candidate is already Registered");
        _;
    }
    
    //store Candidate    
    //fetch Candidate
    //store candidate count
    function add_candidate(address _add, string memory _name) public onlyOwner candidate_registered(_add) {
        Candidates[candidates_count] = Candidate(_name, 0, candidates_count);
        candidates_count++;
        candidate_exist[_add] = true;
        emit Regestering_candidate(candidates_count, _name, Candidates[candidates_count - 1].vote_count );
    }
    
    // FUNCTION TO vote
    function add_vote(uint256 _id) public already_voted(){
        require(_id >= 0 && _id < candidates_count, "Invalid option");
        voters[msg.sender] = true;
        Candidates[_id].vote_count++;
        emit Voted(_id);
        // ,Candidates[_id].vote_count
    }
    
    // FUNCTION TO FIND THE lead
    function leader() public{
        uint256 max_votes = 0;
        string memory name = "";
        for(uint256 i=0; i< candidates_count; i++){
            if(max_votes < Candidates[i].vote_count){
                max_votes = Candidates[i].vote_count;
                name = Candidates[i].name;
            }
        }
        the_one = Lead(name, max_votes);
        emit Leader(max_votes, name);
    }

}

