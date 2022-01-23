fn main() {
    let message = String::from("Hello ");
    let message_2: &String = &message;

    println!("{message_2}");
    println!("{message}");
}

