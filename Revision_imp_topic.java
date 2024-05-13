Marker interfaces in java
---------------------------------
java.io.Serializable
Clonable
EventListner
SingleThreadModel
RandomAccess
java.rmi.Remote

Object
|
Trowable
|	|
Error	Exception
-VMError	|	| 
-AssertErr	|	RuntimeException
	|		|
	|	-ArithmaticException
	|	-NullPointerException
	|	-NumberFormateException
	|
	|
	-IOException
	-SQL Exception
		

Nested Inner class :

- static  & non -static

non-static 
	|
	-Member Inner class
	-annonomus class
	-local class

class outer{
	private data=30;
	class innner{
		void display(){
			sop("Data is "+data);
			}
	}
	
	
	
}
Annonymous Inner class :
----------------------


abstract class Person{
	abstract void eat();
}

class Emp{
	public static void main(String args[]){
			Person p = new Person(){
				void eat(){
					................
					}
			}			
						
	}
p.eat();
	
}


Local class i:e class inside method
------------
class outer{
	private data=30;
	
	void display(){
			sop("Data is "+data);
		class Innner{
			
		}
	}
	
	
	
Externalizable Interface :  Externalizable interface provide the facility to write the object into byte stream into 
compress formate, It is not a marker interface.
The externalizable Interface has two methods-
1. public void writeExternal(ObjectOutput out) throws IOException;
2. public void readExternal(ObjectInput in) throws IOException;






	
	
	
}

