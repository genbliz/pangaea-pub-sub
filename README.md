# pangaea-pub-sub
Publisher subscriber HTTP notification system

## Installation
To clone the project:
```bash
git clone https://github.com/genbliz/pangaea-pub-sub.git
```

`cd` into the `pangaea-pub-sub` directory
```bash
cd pangaea-pub-sub
```

You can create an `.env` file with actual values similar to the `.env.example` file, if you want to change the default ports.

install project dependencies
```
npm install
```

test the project
```bash
npm run test
```

start the project
```bash
npm run start
```

## Notes

### Default Ports are:
* Subscriber: `9001`
* Publisher: `8001`

### Subscriber endpoints are:
* `http://127.0.0.1:9001/sub01`
* `http://127.0.0.1:9001/sub02`


## Usage

### Subscribe `examples`

```bash
POST /subscribe/{topic}
{
    "url": "http://127.0.0.1:9001/sub01"
}
```
OR

```bash
POST /subscribe/{topic}
{
    "url": "http://127.0.0.1:9001/sub02"
}
```

### Publish `example`

```bash
POST /publish/{topic}
{
    "msg": "Test notification"
}
```
