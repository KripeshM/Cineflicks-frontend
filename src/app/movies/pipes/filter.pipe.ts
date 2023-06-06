import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allmovies:any[],searchTerm:String,propertyName:any): any[] {
    const result:any[]=[]
    if(!allmovies||searchTerm==''||propertyName==''){
      return allmovies
    }
    allmovies.forEach((movie:any)=>{
      if(movie[propertyName].trim().toLowerCase().startsWith(searchTerm.trim().toLocaleLowerCase())){
        result.push(movie)
      }
    })
    return result;
  }
}
