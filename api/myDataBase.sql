 CREATE DATABASE bravi;
 
 CREATE TABLE `person` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	PRIMARY KEY (id)
  );
  
   CREATE TABLE `type` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	PRIMARY KEY (id)
  );
  
  
  INSERT INTO `type` values (1,'Email'),
							(2,'Telefone'),
							(3,'Whatsapp');
						
 CREATE TABLE `contact` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`idType` int NOT NULL,
    `idPerson` int NOT NULL,
    `contact` varchar(100) NOT NULL,
	PRIMARY KEY (id),
    foreign key(idType) references `type` (id),
	foreign key(idPerson) references `person` (id)
);


  
  