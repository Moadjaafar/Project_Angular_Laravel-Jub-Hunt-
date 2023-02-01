<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Postuler;

class PostulerController extends Controller
{
    public function Postulation(Request $request){
        $post=new Postuler;
        if($request->hasFile('pdf')){
            $complitFileName=$request->File('pdf')->getClientOriginalName();
            $fileNameOnly=pathinfo($complitFileName,PATHINFO_FILENAME);
            $fileExtention=$request->File('pdf')->getClientOriginalExtension();
            $compdf=str_replace(' ','_',$fileNameOnly).'-'.rand().'_'.time().'.'.$fileExtention;
            $path=$request->File('pdf')->storeAs('public/PdfCv',$compdf);
            $post->pdf=$compdf;
            $post->full_name =$request->full_name;
            $post->Offer_id =$request->Offer_id;
            $post->user_id =$request->user_id;
            $post->save();
            return 1;
        }else{
            return 0;
        }
    }
}
