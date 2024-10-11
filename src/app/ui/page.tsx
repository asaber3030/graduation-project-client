import { Button } from "@/components/ui/button"
import {
  Cog,
  Plus,
  Mail,
  Check,
  Cable,
  Car,
  Hammer,
  Keyboard,
  Music2,
  MoreHorizontal,
  Search,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"

const UIHomePage = () => {
  return (
    <div className="p-20">
      <h1 className="mb-10 text-4xl font-extrabold">Global UI Components</h1>

      <div className="space-x-2">
        <h2 className="text-2xl font-medium mb-2">Buttons</h2>

        <Button icon={Plus} variant="default">
          Plus
        </Button>
        <Button icon={Cog} variant="destructive">
          Cog
        </Button>
        <Button icon={Mail} variant="success">
          Mail
        </Button>
        <Button icon={Check} variant="warning">
          Check
        </Button>
        <Button icon={Cable} variant="blue">
          Cable
        </Button>
        <Button icon={Car} variant="outline">
          Car
        </Button>
        <Button icon={Hammer} variant="secondary">
          Hammer
        </Button>
        <Button icon={Keyboard} variant="ghost">
          Keyboard
        </Button>
        <Button icon={Music2} variant="link">
          Music2
        </Button>
      </div>

      <Separator className="my-5" />

      <div>
        <h2 className="text-2xl font-medium mb-2">Dropdown Menus</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button icon={MoreHorizontal} variant="outline"></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent alignOffset={20}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator className="my-5" />

      <div className="space-y-2">
        <h2 className="text-2xl font-medium mb-2">Data Entry</h2>

        <Input />
        <Input icon={Search} placeholder="Search" />
        <Input placeholder="Enter somethig" />
        <Textarea placeholder="Textarea" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2 mt-4">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>

        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Option Two</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator className="my-5" />

      <div>
        <h2 className="text-2xl font-medium mb-2">Tabs</h2>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="Settings">Settings</TabsTrigger>
            <TabsTrigger value="Apple">Apple</TabsTrigger>
            <TabsTrigger value="Banana">Banana</TabsTrigger>
            <TabsTrigger value="Blueberry">Blueberry</TabsTrigger>
            <TabsTrigger value="Grapes">Grapes</TabsTrigger>
            <TabsTrigger value="Pineapple">Pineapple</TabsTrigger>
            <TabsTrigger value="Invoice">Invoice</TabsTrigger>
            <TabsTrigger value="Status">Status</TabsTrigger>
            <TabsTrigger value="Amount">Amount</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Separator className="my-5" />

      <div>
        <h2 className="text-2xl font-medium mb-2">Tables (Data Show)</h2>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <Separator className="my-5" />

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <Separator className="my-5" />

      <div>
        <h2 className="text-2xl font-medium mb-2">Cards</h2>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default UIHomePage
