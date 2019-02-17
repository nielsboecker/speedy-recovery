package script;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.omg.CORBA.portable.InputStream;

public class test {
	
	public static void patchMethod(String resourceType,String id,String name, String value) throws MalformedURLException, IOException{
	    URL url = new URL("https://r3.smarthealthit.org/Patient/smart-7321938");
	    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
	    connection.setConnectTimeout(15000);//15 secs
	    connection.setReadTimeout(15000);//15 secs

	    connection.setRequestProperty("X-HTTP-Method-Override", "PATCH");
	    connection.setRequestMethod("POST");
	    connection.setDoOutput(true);
	    connection.setRequestProperty("Content-Type", "application/json-patch+json");

	    OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream());  
	    out.write(
	            
	    		       "{"+
	    	                "\""+name+"\""+":"+"\""+value+"\""+
	    	            "}"
	            );
	    out.flush();
	    out.close();

	    int res = connection.getResponseCode();
	    System.out.println(connection.getResponseMessage());
	    System.out.println(res);

	    InputStream is = (InputStream) connection.getInputStream();
	    BufferedReader br = new BufferedReader(new InputStreamReader(is));
	    String line = null;
	    while((line = br.readLine() ) != null) {
	        System.out.println(line);
	    }
	    connection.disconnect();
	}

	public static void main(String[] args) throws MalformedURLException, IOException {
		// TODO Auto-generated method stub
		patchMethod("Pateint","smart-7321938","gender","female");
		
	}

}
