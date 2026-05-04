# Tira Server Setup & MongoDB Fix

## MongoDB Connection Error Fix (ECONNREFUSED querySrv)

**Root Cause:** Invalid MongoDB Atlas cluster name `cluster0.atavlfd` in MONGO_URI - DNS SRV lookup fails (no records found).

## Quick Fix Steps:

1. **Login to [MongoDB Atlas](https://cloud.mongodb.com/)** → Select your project/cluster.

2. **Get Correct Connection String:**
   - Click **Connect** → **Drivers** 
   - Copy `mongodb+srv://<username>:<password>@clustername.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Note your actual **cluster name** (e.g., `Cluster0`, not `cluster0.atavlfd`)

3. **Update `server/.env`:**
   ```
   MONGO_URI="mongodb+srv://yourusername:yourpassword@youractualcluster.xxxxx.mongodb.net/tira?retryWrites=true&w=majority"
   ```
   *(Replace with your details. Database name `tira` optional)*

4. **Whitelist Your IP:**
   - **Network Access** → **Add IP Address** → `0.0.0.0/0` (Allow all - **remove after testing**)

5. **Restart Server:**
   ```bash
   cd server
   node index.js
   ```
   *Expect: `Mongo DB connected` + `Server running on port 3001`*

## If SRV Still Fails (Firewall/Network):
Use **Standard Connection String** from Atlas → **Connect** → **Compass**:
```
MONGO_URI="mongodb://username:pass@host1:27017,host2:27017/db?replicaSet=rs0&authSource=admin"
```

## Test Commands:
```bash
# DNS test (should resolve after fix)
nslookup _mongodb._tcp.YOUR_CLUSTER.mongodb.net

# Server start
cd server && node index.js
```

**Server Features Ready:** Products, Users, Orders, Razorpay Payments, Admin routes.

Updated TODO.md below tracks progress.
