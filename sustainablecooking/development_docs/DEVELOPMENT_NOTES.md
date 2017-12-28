# Development Notes

### Pick - 3
* Front End framework
  * I'm (jack) pretty partial to material design so my suggestion is React with this framework
  * https://reactjs.org/
  * http://www.material-ui.com/#/
* SMS
	* https://github.com/cubiclesoft/email_sms_mms_gateways/blob/master/sms_mms_gateways.txt
	* This has a pretty encompasing list of SMS/Email gateways that would let us send SMS to numbers for free, we'd just have to find out what carrier the number is on beforehand
	* https://numverify.com/ we could use this? or just ask the user
  * https://github.com/typpo/textbelt another alternative for sms
* Geolocation
	* Easy, weve done this before 	


### Back End Framework
https://expressjs.com/

We have to use one and everyone should be familiar with nodejs pretty soon. We could perform all of our API requests on the back end, that way we could cache data scraped from the local foods site (so we dont have to scrape it too many times). The client could make a post request to the server with their location & we could return all of the data that they need. maybe?
