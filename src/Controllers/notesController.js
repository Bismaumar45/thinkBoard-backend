import Notes from "../models/Notes.js"
export  async function getAllNotes(_,res){
    try{
        const notes=await Notes.find().sort({createAt:1}) //Newest Note
        res.status(200).json(notes)
    }
    catch(error){
        console.error("Error in getting all the notes",error)
        res.status(500).json({message:"Internal server down"})
    }
}

export async function NotebyId(_,res) {
    try{
        const findNote=await Notes.findById(_.params.id)
        if(!findNote) return res.status(404).json({message:"Note Not found"});
        res.status(200).json(findNote);
    }
    catch(error){
        console.error("Error in getting all the notes",error)
        res.status(500).json({message:"Internal server down"})
    }
    
}
export async function createNotes(req,res){
    try{
        const {title,content}=req.body
        const notes=new Notes({title:title, content:content})

        const savedNote= await notes.save()
        res.status(200).json(savedNote)
    }
    catch(error){
        console.error("Error in creating notes",error)
        res.status(500).json({message:"Internal server down"})
    }
};


export async function updateNotes(req,res){
    try{
        const {title,content}=req.body
        const updateNote=await Notes.findByIdAndUpdate(req.params.id,{title,content},{
            new:true,
        })

        if(!updateNote) return res.status(404).json({message:"Note Not found"});
        res.status(200).json({message:"Notes updated successfully"})
    }
    catch(error){
        console.error("Error in updaring notes",error)
        res.status(500).json({message:"Internal server down"})
    }
};


export async function delNotes(req,res){
    try{
        const deleteNote=await Notes.findByIdAndDelete(req.params.id)
        if(!deleteNote)return res.status(404).json({message:"Deleted note not found"}); 
        res.status(200).json({message:"Note deleted successfully"})  
    }
    catch(error){
        console.error("Error in updaring notes",error)
        res.status(500).json({message:"Internal server down"})
    }
};


