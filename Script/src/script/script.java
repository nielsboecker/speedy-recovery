package script;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class script {
	
	public static void postMethod(String path) throws FileNotFoundException,IOException, ParseException{
		//get the path for each json file...
		List<Path> pathList;
		String FileExtension;
		String resourceType;
		try(Stream<Path> paths = Files.walk(Paths.get(path))){
			  
			pathList=paths.filter(Files::isRegularFile).collect(Collectors.toList());
		}
		BufferedWriter writer = new BufferedWriter(new FileWriter("log.txt",true));
		writer.newLine();
		writer.write("POST");
		writer.newLine();
		writer.close();
		for(int i=0; i<pathList.size(); i++) {
			//get the json object
			JSONParser parser = new JSONParser();
			JSONObject json;
			String currentPath=pathList.get(i).toString();
			FileExtension=currentPath.substring(currentPath.length()-4, currentPath.length());
			

			//check the file is json file
		     if(FileExtension.equals("json")){
		    	 System.out.println("Post: "+currentPath);
		    	 //covert the file to json object
		    	 json = (JSONObject) parser.parse(new FileReader(currentPath));
		    	 //creat http request
				 CloseableHttpClient httpClient = HttpClientBuilder.create().build();
				 //get the resource type
				 resourceType =json.get("resourceType").toString();
					
					//Post the request
					try {
					    HttpPost post = new HttpPost("https://r3.smarthealthit.org/"+resourceType);
					    post.setEntity(new StringEntity(json.toString(), ContentType.APPLICATION_JSON));
					    post.addHeader("Accept","application/json");
					    HttpResponse response=httpClient.execute(post);
					    
					    //get the response message...
					       BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
					    //write it in to log
					       BufferedWriter writer2 = new BufferedWriter(new FileWriter("log.txt",true));
					       String line;
					       System.out.println("POST:");
					       while(null !=(line=rd.readLine())){
					    	   System.out.println(line);
					    	 
					    	 //get id of the resource
					    	if(line.contains("Successfully")){
					    		int indexOfId=line.indexOf(resourceType)+resourceType.length()+1;
					    		String subTemp=line.substring(indexOfId, line.length());
					    		String id=subTemp.substring(0,subTemp.indexOf("/"));
					    		
					    		//write the id resource type and date in to log 
					    		writer2.write("ID: "+id+"  ");
					    		writer2.write("resourceType: "+resourceType+"  ");
					    		Date date = new Date();
					    	    SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
					    	    writer2.write("Date: "+ft.format(date).toString()+"  ");
					    	    writer2.write("File: "+currentPath);
					    	    writer2.newLine();
					    	    writer2.close();
					    	}
					    	
					       }
					       System.out.println();
					
					} catch (Exception ex) {
					    // handle exception here
					} finally {
					    httpClient.close();
					}
		    	 
		     }
		}
		
	}
	
	public static void deleteMethod(String resourceType,String id) throws FileNotFoundException, IOException, ParseException {
		//delete the appointment...
		CloseableHttpClient httpClient = HttpClientBuilder.create().build();
		BufferedWriter writer = new BufferedWriter(new FileWriter("log.txt",true));

		try {
			//delete the data according to the resource type and id
			HttpDelete delete = new HttpDelete("https://r3.smarthealthit.org/"+resourceType+"/"+id);
			delete.setHeader("Accept", "application/json");
			HttpResponse response = httpClient.execute(delete);
			//print the response...
			BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
		       String line;
		       System.out.println("DELETE");
		       while(null !=(line=rd.readLine())){
		    	   System.out.println(line);
		    	   if(line.contains("Successfully")){
		    			writer.newLine();
		    			writer.write("DELETE");
		    			writer.newLine();
		    			writer.write("ID:"+ id+"  ");
		    			writer.write("resourceType:"+resourceType+"  ");
			    		Date date = new Date();
			    	    SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
			    	    writer.write("Date: "+ft.format(date).toString()+"  ");
		    			writer.newLine();
		    			writer.close();
		    	   }
		       
		       }
			
		}catch (Exception ex) {
		    // handle exception here
		} finally {
		    httpClient.close();
		}
	}

	public static void main(String[] args) throws FileNotFoundException, IOException, ParseException {
		postMethod("json");
		deleteMethod("Appointment","219705");
	}
}
