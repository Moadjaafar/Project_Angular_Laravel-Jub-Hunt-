<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Offer;
use App\Models\Postuler;
use Carbon\Carbon;
use App\Http\Controllers\stream;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Client\Response as ClientResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;
use Symfony\Component\HttpKernel\HttpCache\Store;


class OfferController extends Controller
{
    public function createOffer(Request $request)
    {
        return Offer::create($request->all());
    }
    public function getAll(Request $request)
    {
        //return Offer::all();
        $article =Offer::orderBy('id','desc')->get();
        foreach ($article as $item) {
            //$date = Carbon::parse($item->created_at)->diffForHumans();
            //$item->created_at=$date;
            Carbon::setlocale('en');
            $item->setAttribute('time',Carbon::parse($item->created_at)->diffForHumans());
        }
        return response()->json($article);

    }

    public function findMyOffer($id)
    {
        if(Offer::where('user_id',$id)->exists()){
            $offer=Offer::where('user_id',$id)->get();
            foreach ($offer as $item) {
                //$date = Carbon::parse($item->created_at)->diffForHumans();
                //$item->created_at=$date;
                Carbon::setlocale('en');
                $item->setAttribute('time',Carbon::parse($item->created_at)->diffForHumans());
                //return $item;
            }
            return response()->json($offer);
        }else{
            return 1;
        }
    }
    public function deleteOffer($id)
    {
        if(Offer::where('id',$id)->exists()){
            Offer::where('id',$id)->delete();
        }else{
            return 1;
        }
    }
    public function findfirstOffer()
    {
        $article=Offer::orderBy('id', 'desc')->first();
            //$date = Carbon::parse($item->created_at)->diffForHumans();
            //$item->created_at=$date;
            Carbon::setlocale('en');
            $article->setAttribute('time',Carbon::parse($article->created_at)->diffForHumans());

        return response()->json($article);

    }
    public function findtargtedOfr($id)
    {
        if(Offer::where('id',$id)->exists()){
            $offer=Offer::where('id',$id)->get();
            foreach ($offer as $item) {
                //$date = Carbon::parse($item->created_at)->diffForHumans();
                //$item->created_at=$date;
                Carbon::setlocale('en');
                $item->setAttribute('time',Carbon::parse($item->created_at)->diffForHumans());
                //return $item;
            }
            return $offer[0];


        }else{
            return 1;
        }
    }
    public function update(Request $request, $id)
    {
        if(Offer::where('id',$id)->exists()){
            $article =Offer::find($id);
            $article->Title =$request->Title;
            $article->Description =$request->Description;
            $article->Ville =$request->Ville;
            $article->Category =$request->Category;

            $article->save();
            return response()->json([
                "message"=>"offer updated successfully"
            ], 200);
        }else{
            return response()->json([
                "message"=>"offer not found"
            ], 404);
        }
    }

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
    public function Download(Request $request,$id){
        if(Postuler::where('id',$id)->exists()){
            $article =Postuler::find($id);
            $path=$article->pdf;
            $f=public_path('/storage/PdfCv/'.$path);
            //return response()->download($f);
            return response()->file($f);
        }else{
            return response()->json([
                "message"=>"offer not found"
            ], 404);
        }
    }
    public function offeritrested($id)
    {
        if(Postuler::where('Offer_id',$id)->exists()){
            $offer=Postuler::where('Offer_id',$id)->get();

            return $offer;
        }else{
            return 1;
        }
    }
    public function SEARCH(Request $request)
    {
        if(Offer::where('Category',$request->Category)->where('Ville',$request->Ville)->exists()){
            $offer=Offer::where('Category',$request->Category)->where('Ville',$request->Ville)->get();
            foreach ($offer as $item) {
                //$date = Carbon::parse($item->created_at)->diffForHumans();
                //$item->created_at=$date;
                Carbon::setlocale('en');
                $item->setAttribute('time',Carbon::parse($item->created_at)->diffForHumans());
                //return $item;
            }
            return response()->json($offer);
        }else{
            return 0;
        }

    }
}
